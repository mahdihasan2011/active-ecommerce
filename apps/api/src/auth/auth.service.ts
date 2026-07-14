import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import * as bcrypt from 'bcryptjs';
import { AuthResponse } from '@repo/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto): Promise<AuthResponse> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email address already registered');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        password: hashedPassword,
        role: dto.role,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        walletBalance: true,
        permissions: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const tokenPayload = { email: user.email, sub: user.id, role: user.role };
    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role as any,
        walletBalance: user.walletBalance,
        permissions: user.permissions,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }

  async signin(dto: SigninDto): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const tokenPayload = { email: user.email, sub: user.id, role: user.role };
    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role as any,
        walletBalance: user.walletBalance,
        permissions: user.permissions,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }
}
