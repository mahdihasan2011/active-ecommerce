import { Injectable, ConflictException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { SearchIndexerProcessor } from '../jobs/search-indexer.processor';
import { Product } from '@repo/types';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly searchIndexer: SearchIndexerProcessor,
  ) {}

  async create(ownerId: string, dto: CreateProductDto): Promise<Product> {
    // 1. Verify shop ownership
    const shop = await this.prisma.shop.findUnique({
      where: { id: dto.shopId },
    });

    if (!shop) {
      throw new NotFoundException('Shop not found');
    }

    if (shop.ownerId !== ownerId) {
      throw new ForbiddenException('You do not own this shop');
    }

    // 2. Slug check
    const existingSlug = await this.prisma.product.findUnique({
      where: { slug: dto.slug },
    });

    if (existingSlug) {
      throw new ConflictException('Product slug is already in use');
    }

    // 3. Create inside Prisma transaction
    const product = await this.prisma.$transaction(async (tx) => {
      const createdProduct = await tx.product.create({
        data: {
          name: dto.name,
          slug: dto.slug,
          description: dto.description,
          price: dto.price,
          compareAtPrice: dto.compareAtPrice,
          isPublished: dto.isPublished ?? false,
          status: dto.isPublished ? 'PUBLISHED' : 'DRAFT',
          shopId: dto.shopId,
          categoryId: dto.categoryId || null,
        },
      });

      if (dto.variants && dto.variants.length > 0) {
        await tx.productVariant.createMany({
          data: dto.variants.map((v) => ({
            name: v.name,
            sku: v.sku,
            price: v.price,
            stock: v.stock,
            productId: createdProduct.id,
          })),
        });
      }

      return createdProduct;
    });

    // 4. Run indexer synchronously
    try {
      this.searchIndexer.process('index-product', { productId: product.id }).catch(err => {
        console.error(`Failed to dispatch search index job for product ${product.id}:`, err);
      });
    } catch (err) {
      console.error(`Error starting index job for product ${product.id}:`, err);
    }

    return product as any;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      include: {
        category: true,
        shop: true,
        variants: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return products as any[];
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        shop: true,
        variants: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product as any;
  }

  async delete(ownerId: string, id: string): Promise<void> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { shop: true },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.shop.ownerId !== ownerId) {
      throw new ForbiddenException('You do not own this product store');
    }

    await this.prisma.product.delete({
      where: { id },
    });

    try {
      this.searchIndexer.process('delete-product', { productId: id }).catch(err => {
        console.error(`Failed to dispatch delete search index job for product ${id}:`, err);
      });
    } catch (err) {
      console.error(`Error starting delete index job for product ${id}:`, err);
    }
  }
}
