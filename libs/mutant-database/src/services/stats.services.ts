import { Model } from 'mongoose';

import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Dna } from '@mutant/mutant-database/schemas';
import { StatsEntity } from '@mutant/mutant-entities';

@Injectable()
export class StatsServices {
  private readonly logger: Logger = new Logger(StatsServices.name);

  constructor(@InjectModel(Dna.name) private dnaModel: Model<Dna>) {}

  async get(): Promise<StatsEntity> {
    const stastReturn = new StatsEntity();
    const stats = await this.dnaModel.aggregate([{ $group: { _id: '$isMutant', count: { $sum: 1 } } }]).exec();
    if (!stats || stats.length === 0) return null;
    stats.sort((a, b) => (a.count > b.count ? 1 : -1));
    stastReturn.count_mutant_dna = this.countMutant(stastReturn);
    stastReturn.count_human_dna = this.countHuman(stastReturn);
    stastReturn.ratio = this.calculateRatio(stastReturn);
    return stastReturn;
  }

  private calculateRatio(stats: StatsEntity) {
    if (stats.count_mutant_dna === 0 || stats.count_human_dna === 0) return 0;

    return stats.count_mutant_dna < stats.count_human_dna
      ? stats.count_mutant_dna / stats.count_human_dna
      : stats.count_human_dna / stats.count_mutant_dna;
  }

  private countMutant(stats: StatsEntity): number {
    return stats.count_mutant_dna ? stats.count_mutant_dna : 0;
  }

  private countHuman(stats: StatsEntity): number {
    return stats.count_human_dna ? stats.count_human_dna : 0;
  }
}
