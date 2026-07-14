import { Controller, Post, Body, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User, ApiResponse } from '@repo/types';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('VENDOR')
  @Post()
  async create(@CurrentUser() user: User, @Body() dto: CreateProductDto): Promise<ApiResponse> {
    const data = await this.productsService.create(user.id, dto);
    return {
      success: true,
      message: 'Product registered successfully',
      data,
    };
  }

  @Get()
  async getAll(): Promise<ApiResponse> {
    const data = await this.productsService.findAll();
    return {
      success: true,
      data,
    };
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<ApiResponse> {
    const data = await this.productsService.findOne(id);
    return {
      success: true,
      data,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('VENDOR')
  @Delete(':id')
  async delete(@CurrentUser() user: User, @Param('id') id: string): Promise<ApiResponse> {
    await this.productsService.delete(user.id, id);
    return {
      success: true,
      message: 'Product deleted successfully',
    };
  }
}
