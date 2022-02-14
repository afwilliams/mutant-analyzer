import { Test, TestingModule } from '@nestjs/testing';

import { MongoMemoryServer } from 'mongodb-memory-server';

import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { DnaService, StatsServices } from '@mutant/mutant-database';
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

describe('StatsServices', () => {
  let module: TestingModule;
  let statsServices: StatsServices;
  let dnaService: DnaService;

  const closeInMongodConnection = async () => {
    if (mongod) await mongod.stop();
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: Dna.name, schema: DnaSchema, collection: Dna.name.toLowerCase() }]),
      ],
      providers: [DnaService, StatsServices],
    }).compile();

    dnaService = module.get<DnaService>(DnaService);
    statsServices = module.get<StatsServices>(StatsServices);
  });

  afterAll(async () => {
    await module.close();
    await closeInMongodConnection();
  });

  it('DnaService should be defined', () => {
    expect(dnaService).toBeDefined();
  });
  it('DnaService should be defined', () => {
    expect(dnaService).toBeDefined();
  });

  it('should Stast null', async () => {
    const statsGet = await statsServices.get();
    expect(statsGet).toBeNull();
  });

  it('should get all Stast', async () => {
    await dnaService.save('CTGCAA,CAGTGC,TTATGT,AGAAGG,ACCCTA,TCACTG', false);
    await dnaService.save('ATGCGA,CAGTGC,TTATGT,AGAAGG,CCCCTA,TCACTG', true);
    const statsGet = await statsServices.get();
    expect(statsGet).not.toBeNull();
  });
});
