import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Dna } from '@mutant/mutant-database/schemas/dna.schema';

@Injectable()
export class DnaService {
  constructor(@InjectModel(Dna.name) private dnaModel: Model<Dna>) {}

  async save(dna: string, isMutant: boolean): Promise<string> {
    const model = new this.dnaModel({ value: dna?.toString(), isMutant: isMutant });
    await model.save();
    return model?._id;
  }
}
