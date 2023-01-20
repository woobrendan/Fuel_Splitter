import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IndividualInfo, TripInfo } from '../../fuel_splitter/src/model';

export type BillDocument = HydratedDocument<Bill>;

@Schema()
export class Bill {
  @Prop({ required: true })
  totalPrice: number;

  @Prop()
  totalKM: number;

  @Prop()
  costPerLitre: number;

  @Prop()
  tripLogs: TripInfo[];

  @Prop()
  brendan: IndividualInfo;

  @Prop()
  lory: IndividualInfo;

  @Prop()
  david: IndividualInfo;

  @Prop()
  parco: IndividualInfo;
}
