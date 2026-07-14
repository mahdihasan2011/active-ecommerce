import { IsEnum } from 'class-validator';
import { ShopStatus } from '@prisma/client';

export class UpdateShopStatusDto {
  @IsEnum(ShopStatus, { message: 'Status must be PENDING, APPROVED, or REJECTED' })
  status!: ShopStatus;
}
