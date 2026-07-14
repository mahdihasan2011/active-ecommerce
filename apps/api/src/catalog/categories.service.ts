import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from '@repo/types';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCategoryDto): Promise<Category> {
    const existingSlug = await this.prisma.category.findUnique({
      where: { slug: dto.slug },
    });

    if (existingSlug) {
      throw new ConflictException('Category slug is already in use');
    }

    const category = await this.prisma.category.create({
      data: {
        name: dto.name,
        slug: dto.slug,
        parentId: dto.parentId || null,
      },
    });

    return category as any;
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany({
      where: { parentId: null },
      include: {
        children: {
          include: {
            children: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    });
    return categories as any[];
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        children: true,
        parent: true,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category as any;
  }
}
