import { Injectable, Logger } from '@nestjs/common';
import { DnaUtil } from './dna.util';

@Injectable()
export class MutantCoreService {
  private logger = new Logger(MutantCoreService.name);

  async isMutant(dna: Array<string>): Promise<boolean> {
    DnaUtil.check(dna);
    let countMatches = 0;
    for (let row = 0; row < dna.length; row++) {
      // countMatches += this.checkHorizontalMatches(dna[row]);
      // countMatches += this.checkVerticalMatches(dna, row);
      this.logger.log(`row ${row}`);
      this.checkObliqueMatches(dna, row);
    }

    this.logger.log(`Total Matches ${countMatches}`);

    return true;
  }

  private checkHorizontalMatches(row: string): number {
    return this.findMatches(row);
  }

  private checkVerticalMatches(dna: Array<string>, row: number): number {
    let columnWord = '';
    for (let columnIndex = 0; columnIndex < dna[row].length; columnIndex++) {
      columnWord += dna[columnIndex][row];
    }
    return this.findMatches(columnWord);
  }

  private checkObliqueMatches(dna: Array<string>, row: number) {
    let columnWord = '';
    let indexCell = 0;

    for (let r = 0; r < dna.length; r++) {
      for (let columnIndex = 0; columnIndex < dna[r].length; columnIndex++) {
        columnWord += dna[columnIndex][row];
      }
      this.logger.log(`columnWord ${columnWord}`);

    }

    // for (let cellIndex = 0; cellIndex < dna[row].length; cellIndex++) {
    //
    //   this.logger.log(`row ${row}`);
    //   this.logger.log(`dna[cellIndex] ${dna[cellIndex]}`);
    //   cellWord += dna[cellIndex][row];
    //   for (let index = 0; index < 6; index++) {
    //     // this.logger.log(`index ${index}`);
    //     // this.logger.log(`index ${dna[cellIndex][index]}`);
    //   }
    //   //this.logger.log(`cellWord ${cellWord}`);
    // }
  }

  private findMatches(word: string): number {
    let potentialMatchesIndex = [];
    let countWordMatches;
    let previous = 0;
    for (let i = 0; i < word.length; i++) {
      if ((i + 1) % 2) {
        if (previous !== i && word[previous] === word[i]) {
          potentialMatchesIndex = Array.from(
            word.substring(previous === 0 ? previous : previous - 1, i + 2),
          );
          this.logger.log(`potential matches ${potentialMatchesIndex}`);
          countWordMatches = potentialMatchesIndex.filter((w) => w === word[i]);
        }
        previous = i;
      }
    }

    return countWordMatches && countWordMatches.length >= 4 ? 1 : 0;
  }
}
