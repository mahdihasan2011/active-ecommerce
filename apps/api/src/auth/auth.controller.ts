import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User, ApiResponse } from '@repo/types';
import { AuthGuard } from '@nestjs/passport';
import { RequestOtpDto } from './dto/request-otp.dto';

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

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: any) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: any): Promise<ApiResponse> {
    return {
      success: true,
      message: 'Google login successful',
      data: req.user,
    };
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth(@Req() req: any) {}

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthRedirect(@Req() req: any): Promise<ApiResponse> {
    return {
      success: true,
      message: 'Facebook login successful',
      data: req.user,
    };
  }

  @Post('otp/request')
  async requestOtp(@Body() dto: RequestOtpDto): Promise<ApiResponse> {
    console.log(`[SMS OTP] Dispatching login OTP to: ${dto.phoneNumber}`);
    return {
      success: true,
      message: 'OTP dispatched successfully to phone',
      data: {
        mockOtp: '123456',
      },
    };
  }
}
