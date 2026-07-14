import { Controller, Post, Body, Get, Patch, Param, UseGuards } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopStatusDto } from './dto/update-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User, ApiResponse } from '@repo/types';

@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('VENDOR', 'CUSTOMER')
  @Post()
  async create(@CurrentUser() user: User, @Body() dto: CreateShopDto): Promise<ApiResponse> {
    const data = await this.shopsService.create(user.id, dto);
    return {
      success: true,
      message: 'Shop registration requested successfully',
      data,
    };
  }

  @Get()
  async getApproved(): Promise<ApiResponse> {
    const data = await this.shopsService.findAllApproved();
    return {
      success: true,
      data,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('VENDOR')
  @Get('my-shop')
  async getMyShop(@CurrentUser() user: User): Promise<ApiResponse> {
    const data = await this.shopsService.findByOwner(user.id);
    return {
      success: true,
      data,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('admin/all')
  async getAll(): Promise<ApiResponse> {
    const data = await this.shopsService.findAll();
    return {
      success: true,
      data,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body() dto: UpdateShopStatusDto): Promise<ApiResponse> {
    const data = await this.shopsService.updateStatus(id, dto);
    return {
      success: true,
      message: `Shop status updated to ${dto.status}`,
      data,
    };
  }
}
