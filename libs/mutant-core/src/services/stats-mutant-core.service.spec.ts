import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Dna, DnaSchema } from '@mutant/mutant-database/schemas';
import { StatsServices } from '@mutant/mutant-database';
import { StatsMutantCoreService } from '@mutant/mutant-core';
import { StatsEntity } from '@mutant/mutant-entities';

describe('StatsMutantCoreService', () => {
  let moduleMongo: TestingModule;
  let statsServices: StatsServices;
  let statsCoreService;
  let mongod;

  const rootMongooseTestModule = () =>
    MongooseModule.forRootAsync({
      useFactory: async () => {
        mongod = await MongoMemoryServer.create();
        const mongoUri = await mongod.getUri();
        return { uri: mongoUri };
      },
    });

  const closeInMongodConnection = async () => {
    if (mongod) await mongod.stop();
  };

  beforeAll(async () => {
    moduleMongo = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: Dna.name, schema: DnaSchema, collection: Dna.name.toLowerCase() }]),
      ],
      providers: [StatsServices],
      exports: [StatsServices],
    }).compile();

    statsServices = moduleMongo.get<StatsServices>(StatsServices);
  });

  afterAll(async () => {
    await moduleMongo.close();
    await closeInMongodConnection();
  });

  it('statsServices should be defined', () => {
    expect(statsServices).toBeDefined();
  });

  it('stats return', async () => {
    const statsEntity: StatsEntity = { count_mutant_dna: 40, count_human_dna: 100, ratio: 0.4 };
    const dnaServiceMock = jest.spyOn(statsServices, 'get').mockImplementation(async () => statsEntity);
    statsCoreService = new StatsMutantCoreService(statsServices);
    const statsResult = await statsCoreService.getStats();
    expect(dnaServiceMock).toBeCalledTimes(1);
    expect(statsResult).not.toBe(null);
    expect(statsResult).toEqual(statsEntity);
  });
});
