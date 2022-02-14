import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { SchemaModule } from '@mutant/mutant-database/schemas/schema.module';
import { DnaService, StatsServices } from '@mutant/mutant-database/services';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MUTANT_ANALYZER_CONNECTION_STRING, {
      dbName: process.env.MUTANT_ANALYZER_DATABASE_NAME,
    }),
    SchemaModule,
  ],
  providers: [MongooseModule, DnaService, StatsServices],
  exports: [MongooseModule, DnaService, StatsServices],
})
export class MutantDatabaseModule {}
