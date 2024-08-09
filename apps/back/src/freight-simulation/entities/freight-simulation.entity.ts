import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';
import { LogisticsOperator } from 'src/logistics-operator/entities/logistics-operator.schema';
import { FreightSimulationMinMax } from '../constants/min-max-values';

export type FreightSimulationDocument = HydratedDocument<FreightSimulation>;


@Schema()
class Address {
  @Prop({
    type: String,
    minLength: FreightSimulationMinMax.AddressMinLength,
    maxLength: FreightSimulationMinMax.AddressMaxLength,
    required: true
  })
  address: string;

  @Prop({
    type: String,
    minLength: FreightSimulationMinMax.ZipCodeMinLength,
    maxLength: FreightSimulationMinMax.ZipCodeMaxLength,
    required: true
  })
  zip_code: string;

  @Prop({
    type: String,
    min: FreightSimulationMinMax.NumberMin,
    max: FreightSimulationMinMax.NumberMax,
    required: true
  })
  number: string;

}

@Schema()
class Product {

  @Prop({
    type: Number,
    min: FreightSimulationMinMax.ProductHeightMinValue,
    max: FreightSimulationMinMax.ProductHeightMaxValue,
    required: true
  })
  height: number;

  @Prop({
    type: Number,
    min: FreightSimulationMinMax.ProductWidthMinValue,
    max: FreightSimulationMinMax.ProductWidthMaxValue,
    required: true
  })
  width: number;

  @Prop({
    type: Number,
    min: FreightSimulationMinMax.ProductLengthMinValue,
    max: FreightSimulationMinMax.ProductLengthMaxValue,
    required: true
  })
  length: number;


  @Prop({type: Address, required: true})
  origin_adresses: Address;

  @Prop({type: Address, required: true})
  destination_adresses: Address;
}

@Schema()
export class FreightSimulation {

  @IsNotEmpty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'LogisticsOperator' })
  cheapest_logistics_operator: LogisticsOperator;

  @IsNotEmpty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'LogisticsOperator' })
  fastest_logistics_operator: LogisticsOperator;

  @Prop({type: Product, required: true})
  product: Product

}

export const FreightSimulationSchema = SchemaFactory.createForClass(FreightSimulation);

