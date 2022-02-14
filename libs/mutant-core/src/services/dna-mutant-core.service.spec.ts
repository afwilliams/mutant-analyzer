import { MongoMemoryServer } from 'mongodb-memory-server';
import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import { DnaNotValid } from '@mutant/mutant-core/exceptions/dna-not-valid';
import { DnaMutantCoreService } from '@mutant/mutant-core/services/dna-mutant-core.service';

import { Dna, DnaSchema } from '@mutant/mutant-database/schemas/dna.schema';
import { DnaService } from '@mutant/mutant-database';

describe('MutantCoreService', () => {
  let mutantCoreService: DnaMutantCoreService;
  let dnaService: DnaService;
  let mongod;
  let moduleMongo: TestingModule;

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
      providers: [DnaService],
      exports: [DnaService],
    }).compile();

    dnaService = moduleMongo.get<DnaService>(DnaService);
  });

  afterAll(async () => {
    await moduleMongo.close();
    await closeInMongodConnection();
  });

  it('dnaService should be defined', () => {
    expect(dnaService).toBeDefined();
  });

  it('DNA not should be null', async () => {
    mutantCoreService = new DnaMutantCoreService(dnaService);
    const dnaEmpty = () => mutantCoreService.isMutant(null);
    await expect(dnaEmpty).rejects.toThrow(DnaNotValid);
  });

  it('DNA not should be empty', async () => {
    mutantCoreService = new DnaMutantCoreService(dnaService);
    const dnaNull = () => mutantCoreService.isMutant([]);
    await expect(dnaNull).rejects.toThrow(DnaNotValid);
  });

  it('DNA not Valid', async () => {
    mutantCoreService = new DnaMutantCoreService(dnaService);
    const dnaNotValid = () => mutantCoreService.isMutant(['ATGCGAA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG']);
    await expect(dnaNotValid).rejects.toThrow(DnaNotValid);
  });

  it('DNA Valid', async () => {
    const dnaServiceMock = jest.spyOn(dnaService, 'save').mockImplementation(async () => '_id_registro');
    mutantCoreService = new DnaMutantCoreService(dnaService);
    const responseMutant = await mutantCoreService.isMutant([
      'ATGCGA',
      'CAGTGC',
      'TTATGT',
      'AGAAGG',
      'CCCCTA',
      'TCACTG',
    ]);
    // expect(dnaServiceMock).toBeCalledTimes(1);
    expect(responseMutant).toBe(true);
  });
});
