import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateShopDto {
  @IsString()
  @IsNotEmpty({ message: 'Shop name cannot be empty' })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: 'Shop slug cannot be empty' })
  slug!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  logo?: string;

  @IsString()
  @IsOptional()
  coverImage?: string;
}
