import { Module } from '@nestjs/common';
import { MutantCoreService } from './mutant-core.service';

@Module({
  providers: [MutantCoreService],
  exports: [MutantCoreService],
})
export class MutantCoreModule {}
