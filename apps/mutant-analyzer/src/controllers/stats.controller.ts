import { Controller, Get, Logger } from '@nestjs/common';
import { StatsMutantCoreService } from '@mutant/mutant-core';
import { ApiTags } from '@nestjs/swagger';
import { StatsEntity } from '@mutant/mutant-entities';

@ApiTags('Get DNA stats')
@Controller('stats')
export class StatsController {
  private logger = new Logger(StatsController.name);

  constructor(private statsMutantCoreService: StatsMutantCoreService) {}

  @Get()
  async stats(): Promise<StatsEntity> {
    return await this.statsMutantCoreService.getStats();
  }
}
