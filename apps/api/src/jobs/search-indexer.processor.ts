import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SearchService } from '../search/search.service';

@Processor('search-indexing')
@Injectable()
export class SearchIndexerProcessor extends WorkerHost {
  private readonly logger = new Logger(SearchIndexerProcessor.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly searchService: SearchService,
  ) {
    super();
  }

  async process(job: Job<any>): Promise<void> {
    const { name, data } = job;
    this.logger.log(`Processing job ${job.id} of type ${name}`);

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
      throw error; // Let BullMQ handle retries
    }
  }
}
