import { Body, Controller, ForbiddenException, Get, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MutantCoreService } from '@mutant/mutant-core';
import { MutantRequests } from './mutant.requests';

@ApiTags('Operations to analyze DNA')
@Controller('mutant')
export class MutantController {
  constructor(private mutantCoreService: MutantCoreService) {
  }

  @Post()
  @HttpCode(200)
  async mutant(@Body() requests: MutantRequests) {
    const isMutant = await this.mutantCoreService.isMutant(requests.dna);
    if (!isMutant) throw new ForbiddenException();
  }


  @Get()
  async get() {
    return 'good';
  }

}
