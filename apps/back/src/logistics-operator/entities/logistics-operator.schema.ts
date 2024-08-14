import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { LogisticsOperatorMinMax } from '../constants/min-max-values';

export type LogisticsOperatorDocument = HydratedDocument<LogisticsOperator>;

@Schema()
class Distance {
  @Prop({
    type: Number, 
    min: LogisticsOperatorMinMax.MinDistanceMinValue,
    max: LogisticsOperatorMinMax.MinDistanceMaxValue,
    required: false 
  })
  min: number;

  @Prop({
    type: Number, 
    min: LogisticsOperatorMinMax.MaxDistanceMinValue,
    max: LogisticsOperatorMinMax.MaxDistanceMaxValue,
    required: false 
  })
  max: number;
}

@Schema()
class DistanceRule {
  @Prop({type: Distance, required: true})
  distance: Distance;

  @Prop({
    type: Number,
    min: LogisticsOperatorMinMax.DistanceMultipleMinValue,
    max: LogisticsOperatorMinMax.DistanceMultipleMaxValue,
    required: true
  })
  distance_multiple: number;

  @Prop({
    type: Number, 
    min: LogisticsOperatorMinMax.EstimatedTimeOfArrivalMinValue,
    max: LogisticsOperatorMinMax.EstimatedTimeOfArrivalMaxValue,
    required: true
  })
  estimated_time_of_arrival: number;
}

@Schema({timestamps: true})
export class LogisticsOperator {
  @Prop({
    type: String,
    minlength:LogisticsOperatorMinMax.NameMinValue,
    maxlength:LogisticsOperatorMinMax.NameMaxValue,
    required: true
  })
  name: string;

  @Prop({
    type: Number, 
    min: LogisticsOperatorMinMax.CostDividerMinValue,
    max: LogisticsOperatorMinMax.CostDividerMaxValue,
    required: true
  })
  cost_divider: number;

  @Prop([{ 
    type: DistanceRule,
    required: true
  }])
  distance_rules: DistanceRule[];

}

export const LogisticsOperatorSchema = SchemaFactory.createForClass(LogisticsOperator);

