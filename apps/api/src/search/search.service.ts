import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from '@opensearch-project/opensearch';

@Injectable()
export class SearchService implements OnModuleInit {
  private client!: Client;
  private readonly logger = new Logger(SearchService.name);
  private readonly indexName = 'products';

  constructor(private readonly configService: ConfigService) {
    const node = this.configService.get<string>('OPENSEARCH_NODE') || 'http://localhost:9200';
    this.client = new Client({
      node,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  async onModuleInit() {
    try {
      const exists = await this.client.indices.exists({ index: this.indexName });
      if (!exists.body) {
        await this.client.indices.create({
          index: this.indexName,
          body: {
            mappings: {
              properties: {
                id: { type: 'keyword' },
                name: { type: 'text', analyzer: 'standard' },
                slug: { type: 'keyword' },
                description: { type: 'text' },
                price: { type: 'double' },
                categoryId: { type: 'keyword' },
                categoryName: { type: 'keyword' },
                shopId: { type: 'keyword' },
                shopName: { type: 'keyword' },
                rating: { type: 'float' },
                createdAt: { type: 'date' },
                variants: {
                  type: 'nested',
                  properties: {
                    id: { type: 'keyword' },
                    name: { type: 'text' },
                    sku: { type: 'keyword' },
                    price: { type: 'double' },
                    stock: { type: 'integer' },
                  },
                },
              },
            },
          },
        });
        this.logger.log(`Created OpenSearch index: ${this.indexName}`);
      }
    } catch (error) {
      this.logger.error(`Failed to initialize OpenSearch index: ${error}`);
    }
  }

  async indexProduct(product: any) {
    const document = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description || '',
      price: product.price,
      categoryId: product.categoryId || '',
      categoryName: product.category?.name || '',
      shopId: product.shopId,
      shopName: product.shop?.name || '',
      rating: product.rating || 0,
      createdAt: product.createdAt,
      variants: product.variants?.map((v: any) => ({
        id: v.id,
        name: v.name,
        sku: v.sku,
        price: v.price,
        stock: v.stock,
      })) || [],
    };

    await this.client.index({
      index: this.indexName,
      id: product.id,
      body: document,
      refresh: true,
    });
    this.logger.log(`Indexed product document: ${product.id}`);
  }

  async deleteProduct(productId: string) {
    await this.client.delete({
      index: this.indexName,
      id: productId,
      refresh: true,
    });
    this.logger.log(`Deleted product document: ${productId}`);
  }

  async search(
    query: string,
    categoryId?: string,
    minPrice?: number,
    maxPrice?: number,
    sortBy?: string,
  ) {
    const must: any[] = [];
    const filter: any[] = [];

    if (query) {
      must.push({
        multi_match: {
          query,
          fields: ['name^3', 'description', 'categoryName', 'shopName'],
          fuzziness: 'AUTO',
        },
      });
    } else {
      must.push({ match_all: {} });
    }

    if (categoryId) {
      filter.push({ term: { categoryId } });
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      const range: any = {};
      if (minPrice !== undefined) range.gte = minPrice;
      if (maxPrice !== undefined) range.lte = maxPrice;
      filter.push({ range: { price: range } });
    }

    const sort: any[] = [];
    if (sortBy === 'price_asc') {
      sort.push({ price: { order: 'asc' } });
    } else if (sortBy === 'price_desc') {
      sort.push({ price: { order: 'desc' } });
    } else if (sortBy === 'rating') {
      sort.push({ rating: { order: 'desc' } });
    } else {
      sort.push({ createdAt: { order: 'desc' } });
    }

    const body = await this.client.search({
      index: this.indexName,
      body: {
        query: {
          bool: {
            must,
            filter,
          },
        },
        sort,
      },
    });

    return body.body.hits.hits.map((hit: any) => hit._source);
  }
}
