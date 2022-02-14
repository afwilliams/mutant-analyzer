import { Cache } from 'cache-manager';

import {
  Body,
  CACHE_MANAGER,
  Controller,
  ForbiddenException,
  HttpCode,
  Inject,
  InternalServerErrorException,
  Logger,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DnaMutantCoreService } from '@mutant/mutant-core';

import { MutantRequests } from './mutant.requests';

@ApiTags('Operations to analyze DNA')
@Controller('mutant')
export class MutantController {
  private logger = new Logger(MutantController.name);

  constructor(private mutantCoreService: DnaMutantCoreService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @Post()
  @HttpCode(200)
  async mutant(@Body() requests: MutantRequests) {
    let isMutant = true;
    try {
      const isMutantCache = await this.cacheManager.get<any>(requests?.dna?.toString());
      if (isMutantCache) return isMutantCache.isMutant;
      isMutant = await this.mutantCoreService.isMutant(requests.dna);
      await this.cacheManager.set(requests?.dna?.toString(), { isMutant });
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
    if (!isMutant) throw new ForbiddenException();
    return isMutant;
  }
}
