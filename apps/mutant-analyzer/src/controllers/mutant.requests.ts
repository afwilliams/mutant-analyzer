import { ApiProperty } from '@nestjs/swagger';

export class MutantRequests {
  @ApiProperty({ isArray: true, type: String })
  dna: Array<string>;
}
