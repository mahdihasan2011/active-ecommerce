import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum } from 'class-validator';
import { Role } from '@prisma/client';

export class SignupDto {
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name!: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password!: string;

  @IsEnum(Role, { message: 'Role must be either ADMIN, VENDOR, or CUSTOMER' })
  role!: Role;
}
