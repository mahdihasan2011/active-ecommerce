import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from '../search/search.service';
import { ApiResponse } from '@repo/types';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async search(
    @Query('q') query = '',
    @Query('categoryId') categoryId?: string,
    @Query('brandId') brandId?: string,
    @Query('badges') badges?: string,
    @Query('attributes') attributes?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('sortBy') sortBy?: string,
  ): Promise<ApiResponse> {
    const min = minPrice ? parseFloat(minPrice) : undefined;
    const max = maxPrice ? parseFloat(maxPrice) : undefined;
    const badgesArray = badges ? badges.split(',') : undefined;
    
    let parsedAttributes: { name: string; value: string }[] | undefined = undefined;
    if (attributes) {
      try {
        parsedAttributes = JSON.parse(attributes);
      } catch (e) {
        // ignore
      }
    }

    const data = await this.searchService.search(
      query, 
      categoryId, 
      brandId, 
      badgesArray, 
      parsedAttributes, 
      min, 
      max, 
      sortBy
    );
    return {
      success: true,
      data,
    };
  }
}
