import { DnaNotValid } from './dna-not-valid';
import { Logger } from '@nestjs/common';

export class DnaUtil {
  private logger = new Logger(DnaUtil.name);

  public static check(dna: Array<string>) {
    if (!dna) throw new DnaNotValid('DNA null');
    if (dna.length === 0) throw new DnaNotValid('DNA empty');

    const size = dna.length;
    const validStringRegex = /[ACGT]+/;

    for (const row of dna) {
      if (row.length !== size) {
        throw new DnaNotValid('Invalid size dna');
      }
    }
  }
}
