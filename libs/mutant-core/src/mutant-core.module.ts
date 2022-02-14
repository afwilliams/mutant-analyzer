import { Module } from '@nestjs/common';

import { MutantDatabaseModule } from '@mutant/mutant-database';
import { DnaMutantCoreService, StatsMutantCoreService } from '@mutant/mutant-core/services';

@Module({
  imports: [MutantDatabaseModule],
  providers: [DnaMutantCoreService, StatsMutantCoreService],
  exports: [MutantDatabaseModule, DnaMutantCoreService, StatsMutantCoreService],
})
export class MutantCoreModule {}
