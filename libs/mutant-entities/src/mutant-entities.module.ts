import { Module } from '@nestjs/common';
import { MutantEntitiesService } from './mutant-entities.service';

@Module({
  providers: [MutantEntitiesService],
  exports: [MutantEntitiesService],
})
export class MutantEntitiesModule {}
