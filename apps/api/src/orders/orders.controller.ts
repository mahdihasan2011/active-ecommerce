import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CheckoutOrderDto } from './dto/checkout-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User, ApiResponse } from '@repo/types';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('checkout')
  async checkout(@CurrentUser() user: User, @Body() dto: CheckoutOrderDto): Promise<ApiResponse> {
    const data = await this.ordersService.checkout(user.id, dto);
    return {
      success: true,
      message: 'Checkout completed successfully',
      data,
    };
  }

  @Get('my-orders')
  async getMyOrders(@CurrentUser() user: User): Promise<ApiResponse> {
    const data = await this.ordersService.getMyOrders(user.id);
    return {
      success: true,
      data,
    };
  }

  @UseGuards(RolesGuard)
  @Roles('VENDOR')
  @Get('vendor/items')
  async getVendorOrders(@CurrentUser() user: User): Promise<ApiResponse> {
    const data = await this.ordersService.getVendorOrders(user.id);
    return {
      success: true,
      data,
    };
  }
}
