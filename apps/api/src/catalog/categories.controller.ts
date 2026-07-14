import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiResponse } from '@repo/types';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  async create(@Body() dto: CreateCategoryDto): Promise<ApiResponse> {
    const data = await this.categoriesService.create(dto);
    return {
      success: true,
      message: 'Category created successfully',
      data,
    };
  }

  @Get()
  async getAll(): Promise<ApiResponse> {
    const data = await this.categoriesService.findAll();
    return {
      success: true,
      data,
    };
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<ApiResponse> {
    const data = await this.categoriesService.findOne(id);
    return {
      success: true,
      data,
    };
  }
}
