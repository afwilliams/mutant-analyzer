import { Test, TestingModule } from '@nestjs/testing';
import { MutantCoreService } from './mutant-core.service';
import { DnaNotValid } from './dna-not-valid';

describe('MutantCoreService', () => {
  let service: MutantCoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MutantCoreService],
    }).compile();

    service = module.get<MutantCoreService>(MutantCoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('DNA not should be null', async () => {
    const dnaEmpty = () => service.isMutant(null);
    await expect(dnaEmpty).rejects.toThrow(DnaNotValid);
  });

  it('DNA not should be empty', async () => {
    const dnaNull = () => service.isMutant([]);
    await expect(dnaNull).rejects.toThrow(DnaNotValid);
  });

  it('DNA not Valid', async () => {
    const dnaNotValid = () =>
      service.isMutant([
        'ATGCGAA',
        'CAGTGC',
        'TTATGT',
        'AGAAGG',
        'CCCCTA',
        'TCACTG',
      ]);
    await expect(dnaNotValid).rejects.toThrow(DnaNotValid);
  });

  it('DNA Valid', async () => {
    const dnaValid = await service.isMutant([
      'ATGCGA',
      'CAGTGC',
      'TTATGT',
      'AGAAGG',
      'CCCCTA',
      'TCACTG',
    ]);
    expect(dnaValid).toBe(true);
  });
});
