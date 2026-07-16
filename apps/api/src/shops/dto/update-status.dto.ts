import { IsIn } from 'class-validator';
import { ShopStatus } from '@repo/types';

export class UpdateShopStatusDto {
  @IsIn(['PENDING', 'APPROVED', 'REJECTED'], { message: 'Status must be PENDING, APPROVED, or REJECTED' })
  status!: ShopStatus;
}
