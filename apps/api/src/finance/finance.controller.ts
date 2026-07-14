import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { DepositDto } from './dto/deposit.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User, ApiResponse } from '@repo/types';

@Controller('finance')
@UseGuards(JwtAuthGuard)
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Post('wallet/deposit')
  async deposit(@CurrentUser() user: User, @Body() dto: DepositDto): Promise<ApiResponse> {
    const data = await this.financeService.deposit(user.id, dto.amount);
    return {
      success: true,
      message: 'Deposit processed successfully',
      data,
    };
  }

  @Get('wallet/transactions')
  async getTransactions(@CurrentUser() user: User): Promise<ApiResponse> {
    const data = await this.financeService.getTransactions(user.id);
    return {
      success: true,
      data,
    };
  }
}
