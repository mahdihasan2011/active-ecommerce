import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ShopsModule } from './shops/shops.module';
import { CatalogModule } from './catalog/catalog.module';
import { SearchModule } from './search/search.module';
import { JobsModule } from './jobs/jobs.module';
// BullModule removed for local execution
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
  ],
})
export class AppModule {}
