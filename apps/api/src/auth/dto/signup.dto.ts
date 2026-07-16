import { IsEmail, IsNotEmpty, IsString, MinLength, IsIn } from 'class-validator';
import { UserRole } from '@repo/types';

export class SignupDto {
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name!: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password!: string;

  @IsIn(['ADMIN', 'VENDOR', 'CUSTOMER'], { message: 'Role must be either ADMIN, VENDOR, or CUSTOMER' })
  role!: UserRole;
}
