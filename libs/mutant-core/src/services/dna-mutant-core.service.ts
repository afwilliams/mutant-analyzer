import { Injectable, Logger } from '@nestjs/common';

import { DnaUtil } from '@mutant/mutant-core/utils/dna.util';
import { DnaService } from '@mutant/mutant-database';

@Injectable()
export class DnaMutantCoreService {
  private logger = new Logger(DnaMutantCoreService.name);

  constructor(private dnaService: DnaService) {}

  async isMutant(dna: Array<string>): Promise<boolean> {
    DnaUtil.check(dna);
    let countMatches = 0;
    const obliques = [];
    const obliquesNegative = [];
    for (let row = 0; row < dna.length; row++) {
      countMatches += this.checkHorizontalMatches(dna[row]);
      countMatches += this.checkVerticalMatches(dna, row);
      obliques.push(await this.getObliqueItems(dna, row));
      obliquesNegative.push(await this.getObliqueItemsNegative(dna, row));
    }

    // for some unknown reason it always takes the coincidence that was analyzed before, that's why I delete it
    obliquesNegative.shift();

    countMatches += this.checkObliqueMatches(obliques);
    countMatches += this.checkObliqueMatches(obliquesNegative);
    this.logger.log(`Total Matches ${countMatches}`);
    const isMutant = countMatches > 0;
    this.dnaService.save(dna?.toString(), isMutant);
    return isMutant;
  }

  private checkHorizontalMatches(row: string): number {
    return this.findMatches(row);
  }

  async getObliqueItems(dna: Array<string>, sequence = 0) {
    const item = [];
    for (let row = 0; row < dna.length; row++) {
      const columnsSort = this.getColumns(dna)[row];
      item.push(columnsSort[row + sequence]);
    }
    return item;
  }

  async getObliqueItemsNegative(dna: Array<string>, sequence = 0) {
    const item = [];
    for (let row = 0; row < dna.length; row++) {
      const columnsSort = this.getColumns(dna)[row];
      item.push(columnsSort[row - sequence]);
    }
    return item;
  }

  private checkVerticalMatches(dna: Array<string>, row: number): number {
    let columnWord = '';
    for (let columnIndex = 0; columnIndex < dna[row].length; columnIndex++) {
      columnWord += dna[columnIndex][row];
    }
    return this.findMatches(columnWord);
  }

  private checkObliqueMatches(obliqueWords) {
    let counMatches = 0;
    for (let wordIndex = 0; wordIndex < obliqueWords.length; wordIndex++) {
      counMatches += this.findMatches(obliqueWords[wordIndex].join(''));
    }
    return counMatches;
  }

  private getColumns(dna: Array<string>): Array<Array<string>> {
    const columnsSort = [];

    for (let row = 0; row < dna.length; row++) {
      const columnWord = [];
      for (let columnIndex = 0; columnIndex < dna[row].length; columnIndex++) {
        columnWord.push(dna[columnIndex][row]);
      }
      columnsSort.push(columnWord);
    }
    return columnsSort;
  }

  private findMatches(word: string): number {
    let potentialMatchesIndex = [];
    let countWordMatches;
    let previous = 0;
    for (let i = 0; i < word.length; i++) {
      if ((i + 1) % 2) {
        if (previous !== i && word[previous] === word[i]) {
          potentialMatchesIndex = Array.from(word.substring(previous === 0 ? previous : previous - 1, i + 2));
          this.logger.log(`potential matches ${potentialMatchesIndex}`);
          countWordMatches = potentialMatchesIndex.filter((w) => w === word[i]);
        }
        previous = i;
      }
    }

    return countWordMatches && countWordMatches.length >= 4 ? 1 : 0;
  }
}
