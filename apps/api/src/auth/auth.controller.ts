import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User, ApiResponse } from '@repo/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignupDto): Promise<ApiResponse> {
    const data = await this.authService.signup(dto);
    return {
      success: true,
      message: 'Account registered successfully',
      data,
    };
  }

  @Post('signin')
  async signin(@Body() dto: SigninDto): Promise<ApiResponse> {
    const data = await this.authService.signin(dto);
    return {
      success: true,
      message: 'Logged in successfully',
      data,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@CurrentUser() user: User): Promise<ApiResponse> {
    return {
      success: true,
      data: user,
    };
  }
}
