import { ApiProperty } from '@nestjs/swagger';

const dnaExample = '["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]';

export class MutantRequests {
  @ApiProperty({ isArray: true, type: String, default: dnaExample })
  dna: Array<string>;
}
