import { Test, TestingModule } from '@nestjs/testing';

import { MongoMemoryServer } from 'mongodb-memory-server';

import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { DnaService } from '@mutant/mutant-database';
import { Dna, DnaSchema } from '@mutant/mutant-database/schemas';

let mongod: MongoMemoryServer;

export const rootMongooseTestModule = (options: MongooseModuleOptions = {}) =>
  MongooseModule.forRootAsync({
    useFactory: async () => {
      mongod = await MongoMemoryServer.create();
      const mongoUri = await mongod.getUri();
      return {
        uri: mongoUri,
        ...options,
      };
    },
  });

describe('MutantDatabaseService', () => {
  let module: TestingModule;
  let service: DnaService;

  const closeInMongodConnection = async () => {
    if (mongod) await mongod.stop();
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: Dna.name, schema: DnaSchema, collection: Dna.name.toLowerCase() }]),
      ],
      providers: [DnaService],
    }).compile();

    service = module.get<DnaService>(DnaService);
  });

  afterAll(async () => {
    await module.close();
    await closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save dna mutant', async () => {
    const dnaSaved = await service.save('ATGCGA,CAGTGC,TTATGT,AGAAGG,CCCCTA,TCACTG', true);
    expect(dnaSaved).not.toBeNull();
  });

  it('should save dna humant', async () => {
    const dnaSaved = await service.save('CTGCAA,CAGTGC,TTATGT,AGAAGG,ACCCTA,TCACTG', false);
    expect(dnaSaved).not.toBeNull();
  });
});
