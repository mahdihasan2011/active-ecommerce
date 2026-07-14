import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { SearchIndexerProcessor } from './search-indexer.processor';
import { SearchModule } from '../search/search.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'search-indexing',
    }),
    SearchModule,
  ],
  providers: [SearchIndexerProcessor],
  exports: [BullModule],
})
export class JobsModule {}
