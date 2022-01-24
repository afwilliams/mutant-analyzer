import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MutantCoreService } from '@mutant/mutant-core';
import { MutantRequests } from './mutant.requests';

@ApiTags('Operations to analyze DNA')
@Controller('mutant')
export class MutantController {
  constructor(private mutantCoreService: MutantCoreService) {}

  @Post()
  async mutant(@Body() requests: MutantRequests): Promise<boolean> {
    return await this.mutantCoreService.isMutant(requests.dna);
  }
}
