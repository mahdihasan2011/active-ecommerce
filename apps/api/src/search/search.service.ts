import { Injectable, OnModuleInit, Logger } from '@nestjs/common';

@Injectable()
export class SearchService implements OnModuleInit {
  private readonly logger = new Logger(SearchService.name);

  async onModuleInit() {
    this.logger.log('OpenSearch is disabled for local SQLite mode. SearchService is mocked.');
  }

  async indexProduct(product: any) {
    this.logger.log(`Mock index product: ${product.id}`);
  }

  async deleteProduct(productId: string) {
    this.logger.log(`Mock delete product: ${productId}`);
  }

  async search(
    query: string,
    categoryId?: string,
    brandId?: string,
    badges?: string[],
    attributes?: { name: string; value: string }[],
    minPrice?: number,
    maxPrice?: number,
    sortBy?: string,
  ) {
    this.logger.warn('Mock search returning empty array because OpenSearch is disabled.');
    return [];
  }
}
