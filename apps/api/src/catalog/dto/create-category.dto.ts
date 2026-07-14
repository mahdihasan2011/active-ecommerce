import { IsNotEmpty, IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'Category name cannot be empty' })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: 'Category slug cannot be empty' })
  slug!: string;

  @IsUUID('4', { message: 'Parent category ID must be a valid UUID' })
  @IsOptional()
  parentId?: string;
}
