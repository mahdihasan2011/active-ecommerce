import { Module } from '@nestjs/common';
import { SearchIndexerProcessor } from './search-indexer.processor';
import { SearchModule } from '../search/search.module';

@Module({
  imports: [
    SearchModule,
  ],
  providers: [SearchIndexerProcessor],
  exports: [SearchIndexerProcessor],
})
export class JobsModule {}
