import { ApiProperty } from '@nestjs/swagger';

export class StatsEntity {
  @ApiProperty()
  count_mutant_dna: number;
  @ApiProperty()
  count_human_dna: number;
  @ApiProperty()
  ratio: number;
}
