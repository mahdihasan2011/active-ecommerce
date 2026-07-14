import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopStatusDto } from './dto/update-status.dto';
import { Shop } from '@repo/types';

@Injectable()
export class ShopsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(ownerId: string, dto: CreateShopDto): Promise<Shop> {
    const existingSlug = await this.prisma.shop.findUnique({
      where: { slug: dto.slug },
    });

    if (existingSlug) {
      throw new ConflictException('Shop slug is already in use');
    }

    const shop = await this.prisma.shop.create({
      data: {
        name: dto.name,
        slug: dto.slug,
        description: dto.description,
        logo: dto.logo,
        coverImage: dto.coverImage,
        ownerId,
      },
    });

    return shop as any;
  }

  async findAllApproved(): Promise<Shop[]> {
    const shops = await this.prisma.shop.findMany({
      where: { status: 'APPROVED' },
      orderBy: { createdAt: 'desc' },
    });
    return shops as any[];
  }

  async findAll(): Promise<Shop[]> {
    const shops = await this.prisma.shop.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        owner: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
      },
    });
    return shops as any[];
  }

  async findByOwner(ownerId: string): Promise<Shop> {
    const shop = await this.prisma.shop.findFirst({
      where: { ownerId },
    });

    if (!shop) {
      throw new NotFoundException('You do not have a registered shop yet');
    }

    return shop as any;
  }

  async updateStatus(id: string, dto: UpdateShopStatusDto): Promise<Shop> {
    const shop = await this.prisma.shop.findUnique({
      where: { id },
    });

    if (!shop) {
      throw new NotFoundException('Shop not found');
    }

    const updatedShop = await this.prisma.shop.update({
      where: { id },
      data: { status: dto.status },
    });

    // If a shop is approved, we can auto-update the user's role to VENDOR if it wasn't already
    if (dto.status === 'APPROVED') {
      await this.prisma.user.update({
        where: { id: shop.ownerId },
        data: { role: 'VENDOR' },
      });
    }

    return updatedShop as any;
  }
}
