import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CheckoutOrderDto } from './dto/checkout-order.dto';
import { Order } from '@repo/types';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async checkout(customerId: string, dto: CheckoutOrderDto): Promise<Order> {
    const commissionRate = 10; // 10% platform commission rate

    return this.prisma.$transaction(async (tx) => {
      // 1. Fetch customer and check balance if paymentMethod is WALLET
      const customer = await tx.user.findUnique({
        where: { id: customerId },
      });

      if (!customer) {
        throw new NotFoundException('Customer not found');
      }

      // 2. Fetch variants and calculate total price, validating stock
      let totalAmount = 0;
      const verifiedItems: any[] = [];

      for (const item of dto.items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });

        if (!product) {
          throw new NotFoundException(`Product not found: ${item.productId}`);
        }

        const variant = await tx.productVariant.findUnique({
          where: { id: item.variantId },
        });

        if (!variant) {
          throw new NotFoundException(`Product variant not found: ${item.variantId}`);
        }

        if (variant.stock < item.quantity) {
          throw new BadRequestException(`Insufficient stock for product variant: ${variant.name}`);
        }

        // Validate product shop matches dto shopId
        if (product.shopId !== dto.shopId) {
          throw new BadRequestException(`Product ${product.name} does not belong to shop ${dto.shopId}`);
        }

        // Lock inventory: decrement variant stock
        await tx.productVariant.update({
          where: { id: item.variantId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });

        const subtotal = product.price * item.quantity;
        totalAmount += subtotal;

        // Calc commission split
        const commissionAmount = parseFloat(((subtotal * commissionRate) / 100).toFixed(2));
        const netSellerEarning = parseFloat((subtotal - commissionAmount).toFixed(2));

        verifiedItems.push({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          price: product.price,
          commissionRate,
          commissionAmount,
          netSellerEarning,
        });
      }

      // 3. Process Wallet cash subtraction
      if (dto.paymentMethod === 'WALLET') {
        if (customer.walletBalance < totalAmount) {
          throw new BadRequestException('Insufficient wallet balance to perform checkout');
        }

        // Decrement wallet balance
        await tx.user.update({
          where: { id: customerId },
          data: {
            walletBalance: {
              decrement: totalAmount,
            },
          },
        });

        // Log transaction
        await tx.walletTransaction.create({
          data: {
            userId: customerId,
            amount: -totalAmount,
            type: 'PURCHASE',
            status: 'COMPLETED',
          },
        });
      }

      // 4. Create master Order
      const order = await tx.order.create({
        data: {
          customerId,
          totalAmount,
          paymentMethod: dto.paymentMethod,
          paymentStatus: dto.paymentMethod === 'WALLET' ? 'PAID' : 'PENDING',
        },
      });

      // 5. Create OrderItems & VendorCommission ledger mappings
      for (const item of verifiedItems) {
        const orderItem = await tx.orderItem.create({
          data: {
            orderId: order.id,
            productId: item.productId,
            variantId: item.variantId,
            shopId: dto.shopId,
            quantity: item.quantity,
            price: item.price,
            commissionRate: item.commissionRate,
            commissionAmount: item.commissionAmount,
            netSellerEarning: item.netSellerEarning,
          },
        });

        // Track commission record split
        await tx.vendorCommission.create({
          data: {
            orderItemId: orderItem.id,
            shopId: dto.shopId,
            totalAmount: orderItem.price * orderItem.quantity,
            commissionRate: item.commissionRate,
            commissionAmount: item.commissionAmount,
            netSellerEarning: item.netSellerEarning,
          },
        });
      }

      return order;
    });
  }

  async getMyOrders(customerId: string): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: { customerId },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return orders as any[];
  }

  async getVendorOrders(ownerId: string): Promise<any[]> {
    // Return all order items belonging to shops owned by the user
    const shop = await this.prisma.shop.findFirst({
      where: { ownerId },
    });

    if (!shop) {
      return [];
    }

    const orderItems = await this.prisma.orderItem.findMany({
      where: { shopId: shop.id },
      include: {
        order: {
          include: {
            customer: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        product: true,
        variant: true,
      },
      orderBy: { id: 'desc' },
    });

    return orderItems;
  }
}
