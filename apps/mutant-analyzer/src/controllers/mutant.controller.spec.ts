import { CacheModule, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DnaMutantCoreService, MutantCoreModule } from '@mutant/mutant-core';

import { MutantController } from './mutant.controller';
import { MutantRequests } from './mutant.requests';

describe('MutantController', () => {
  let mutantController: MutantController;
  let dnaMutantCoreService: DnaMutantCoreService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register(), MutantCoreModule],
      controllers: [MutantController],
    }).compile();

    mutantController = moduleRef.get<MutantController>(MutantController);
    dnaMutantCoreService = moduleRef.get<DnaMutantCoreService>(DnaMutantCoreService);
  });

  it('should be defined', () => {
    expect(mutantController).toBeDefined();
  });

  it('should response internal server error', async () => {
    const request: MutantRequests = new MutantRequests();
    request.dna = ['ATGCGAA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'];
    const endpointRequest = async () => mutantController.mutant(request);
    await expect(endpointRequest).rejects.toThrow(InternalServerErrorException);
  });

  it('should response ok true', async () => {
    const dnaServiceMock = jest.spyOn(dnaMutantCoreService, 'isMutant').mockImplementation(async () => true);
    const request: MutantRequests = new MutantRequests();
    request.dna = ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'];
    const response = await mutantController.mutant(request);
    await expect(response).toBe(true);
  });

  it('should response ForbiddenException', async () => {
    const dnaServiceMock = jest.spyOn(dnaMutantCoreService, 'isMutant').mockImplementation(async () => false);
    const request: MutantRequests = new MutantRequests();
    request.dna = ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'];
    const responseForbiddenException = async () => mutantController.mutant(request);
    await expect(responseForbiddenException).rejects.toThrow(ForbiddenException);
  });
});
