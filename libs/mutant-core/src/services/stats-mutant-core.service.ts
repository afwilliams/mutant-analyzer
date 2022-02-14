import { Injectable, Logger } from '@nestjs/common';
import { StatsServices } from '@mutant/mutant-database';
import { StatsEntity } from '@mutant/mutant-entities';

@Injectable()
export class StatsMutantCoreService {
  private logger = new Logger(StatsMutantCoreService.name);

  constructor(private statsServices: StatsServices) {}

  async getStats(): Promise<StatsEntity> {
    const stats: StatsEntity = await this.statsServices.get();
    return stats;
  }
}
