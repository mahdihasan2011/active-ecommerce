import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { SearchController } from './search.controller';
import { SearchModule } from '../search/search.module';
import { JobsModule } from '../jobs/jobs.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [SearchModule, JobsModule, AuthModule],
  controllers: [ProductsController, CategoriesController, SearchController],
  providers: [ProductsService, CategoriesService],
  exports: [ProductsService, CategoriesService],
})
export class CatalogModule {}
