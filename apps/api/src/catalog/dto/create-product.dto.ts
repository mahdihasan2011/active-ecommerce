import { IsNotEmpty, IsString, IsOptional, IsNumber, IsBoolean, IsArray, ValidateNested, IsUUID, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateVariantDto {
  @IsString()
  @IsNotEmpty({ message: 'Variant name cannot be empty' })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: 'Sku cannot be empty' })
  sku!: string;

  @IsNumber()
  @Min(0, { message: 'Price cannot be negative' })
  price!: number;

  @IsNumber()
  @Min(0, { message: 'Stock cannot be negative' })
  stock!: number;
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'Product name cannot be empty' })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: 'Product slug cannot be empty' })
  slug!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0, { message: 'Price cannot be negative' })
  price!: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  compareAtPrice?: number;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @IsUUID('4', { message: 'Shop ID must be a valid UUID' })
  shopId!: string;

  @IsUUID('4', { message: 'Category ID must be a valid UUID' })
  @IsOptional()
  categoryId?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateVariantDto)
  @IsOptional()
  variants?: CreateVariantDto[];
}
