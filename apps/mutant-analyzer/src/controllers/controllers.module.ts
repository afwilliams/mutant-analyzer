import { Module } from '@nestjs/common';
import { MutantController } from './mutant.controller';
import { MutantCoreModule } from '@mutant/mutant-core';

@Module({
  imports: [MutantCoreModule],
  controllers: [MutantController],
  providers: [],
})
export class ControllersModule {}
