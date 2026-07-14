import { IsNotEmpty, IsArray, ValidateNested, IsEnum, IsUUID, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CheckoutItemDto {
  @IsUUID('4')
  @IsNotEmpty()
  productId!: string;

  @IsUUID('4')
  @IsNotEmpty()
  variantId!: string;

  @IsNumber()
  @Min(1)
  quantity!: number;
}

export class CheckoutOrderDto {
  @IsUUID('4')
  @IsNotEmpty()
  shopId!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CheckoutItemDto)
  items!: CheckoutItemDto[];

  @IsEnum(['WALLET', 'COD'])
  paymentMethod!: 'WALLET' | 'COD';
}
