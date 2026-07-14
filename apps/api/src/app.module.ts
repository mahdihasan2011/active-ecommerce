import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ShopsModule } from './shops/shops.module';
import { CatalogModule } from './catalog/catalog.module';
import { SearchModule } from './search/search.module';
import { JobsModule } from './jobs/jobs.module';
import { BullModule } from '@nestjs/bullmq';
import { FinanceModule } from './finance/finance.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    ShopsModule,
    CatalogModule,
    SearchModule,
    JobsModule,
    FinanceModule,
    OrdersModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>('REDIS_HOST') || 'localhost',
          port: configService.get<number>('REDIS_PORT') || 6379,
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
