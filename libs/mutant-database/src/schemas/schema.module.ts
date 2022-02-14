import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Dna, DnaSchema } from '@mutant/mutant-database/schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: Dna.name, schema: DnaSchema, collection: Dna.name.toLowerCase() }])],
  exports: [MongooseModule],
})
export class SchemaModule {}
