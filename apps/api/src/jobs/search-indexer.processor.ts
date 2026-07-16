import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SearchService } from '../search/search.service';

@Injectable()
export class SearchIndexerProcessor {
  private readonly logger = new Logger(SearchIndexerProcessor.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly searchService: SearchService,
  ) {}

  async process(name: string, data: any): Promise<void> {
    this.logger.log(`Processing job of type ${name}`);

    try {
      if (name === 'index-product') {
        const { productId } = data;
        const product = await this.prisma.product.findUnique({
          where: { id: productId },
          include: {
            category: true,
            shop: true,
            variants: true,
            brand: true,
            badges: true,
            attributes: {
              include: {
                attributeValue: {
                  include: {
                    attribute: true,
                  },
                },
              },
            },
          },
        });

        if (!product) {
          this.logger.warn(`Product not found for indexing: ${productId}`);
          return;
        }

        await this.searchService.indexProduct(product);
      } else if (name === 'delete-product') {
        const { productId } = data;
        await this.searchService.deleteProduct(productId);
      } else {
        this.logger.warn(`Unknown job type: ${name}`);
      }
    } catch (error) {
      this.logger.error(`Error processing search indexing job: ${error}`);
      throw error;
    }
  }
}
