import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WalletTransaction } from '@repo/types';

@Injectable()
export class FinanceService {
  constructor(private readonly prisma: PrismaService) {}

  async deposit(userId: string, amount: number): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.$transaction(async (tx) => {
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          walletBalance: {
            increment: amount,
          },
        },
      });

      const transaction = await tx.walletTransaction.create({
        data: {
          userId,
          amount,
          type: 'DEPOSIT',
          status: 'COMPLETED',
        },
      });

      return {
        walletBalance: updatedUser.walletBalance,
        transaction,
      };
    });
  }

  async getTransactions(userId: string): Promise<WalletTransaction[]> {
    const transactions = await this.prisma.walletTransaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return transactions as any[];
  }
}
