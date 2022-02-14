import { Test, TestingModule } from '@nestjs/testing';
import { MutantEntitiesService } from './mutant-entities.service';

describe('MutantEntitiesService', () => {
  let service: MutantEntitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MutantEntitiesService],
    }).compile();

    service = module.get<MutantEntitiesService>(MutantEntitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
