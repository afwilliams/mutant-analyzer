import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Dna extends Document {
  @Prop()
  value: string;

  @Prop()
  isMutant: boolean;
}

export const DnaSchema = SchemaFactory.createForClass(Dna);
