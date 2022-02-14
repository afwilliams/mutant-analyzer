import { CacheModule, Module } from '@nestjs/common';
import { MutantCoreModule } from '@mutant/mutant-core';

import { MutantController } from './mutant.controller';
import { StatsController } from './stats.controller';

@Module({
  imports: [CacheModule.register(), MutantCoreModule],
  controllers: [MutantController, StatsController],
  providers: [],
})
export class ControllersModule {}
