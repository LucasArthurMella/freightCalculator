import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { LogisticsOperator } from 'src/logistics-operator/entities/logistics-operator.schema';
import { FreightSimulationRequestMinMax } from '../constants/min-max-values';

export type FreightSimulationDocument = HydratedDocument<FreightSimulation>;


@Schema()
class Address {
  @Prop({
    type: String,
    minLength: FreightSimulationRequestMinMax.AddressMinLength,
    maxLength: FreightSimulationRequestMinMax.AddressMaxLength,
    required: true
  })
  address: string;

  @Prop({
    type: String,
    minLength: FreightSimulationRequestMinMax.ZipCodeMinLength,
    maxLength: FreightSimulationRequestMinMax.ZipCodeMaxLength,
    required: false 
  })
  zip_code: string;

  @Prop({
    type: String,
    min: FreightSimulationRequestMinMax.NumberMinLength,
    max: FreightSimulationRequestMinMax.NumberMaxLength,
    required: false 
  })
  number: string;

}

@Schema()
class Product {

  @Prop({
    type: Number,
    min: FreightSimulationRequestMinMax.ProductHeightMinValue,
    max: FreightSimulationRequestMinMax.ProductHeightMaxValue,
    required: true
  })
  height: number;

  @Prop({
    type: Number,
    min: FreightSimulationRequestMinMax.ProductWidthMinValue,
    max: FreightSimulationRequestMinMax.ProductWidthMaxValue,
    required: true
  })
  width: number;

  @Prop({
    type: Number,
    min: FreightSimulationRequestMinMax.ProductLengthMinValue,
    max: FreightSimulationRequestMinMax.ProductLengthMaxValue,
    required: true
  })
  length: number;

  @Prop({
    type: Number, 
    min: FreightSimulationRequestMinMax.DistanceBetweenAdressesMin,
    max: FreightSimulationRequestMinMax.DistanceBetweenAdressesMax,
    required: true
  })
  distance_between_addresses: number; 

  @Prop({type: Address, required: true})
  origin_address: Address;

  @Prop({type: Address, required: true})
  destination_address: Address;
}

@Schema()
export class LogisticsOperatorCalculatedData {
  @Prop({ 
    type: Number, 
    min: FreightSimulationRequestMinMax.CalculatedPriceMin,
    max: FreightSimulationRequestMinMax.CalculatedPriceMax,
    required: true
  })
  price: number;

  @Prop({ 
    type: Number, 
    min: FreightSimulationRequestMinMax.CalculatedPriceMin,
    max: FreightSimulationRequestMinMax.CalculatedPriceMax,
    required: true 
  })
  time_in_days: number;
}

@Schema()
export class FreightSimulation {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'LogisticsOperator', required: false })
  cheapest_logistics_operator: LogisticsOperator;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'LogisticsOperator', required: false })
  fastest_logistics_operator: LogisticsOperator;

  @Prop({ type: LogisticsOperatorCalculatedData, required: true })
  logistics_operator1_calculated_data: LogisticsOperatorCalculatedData;

  @Prop({ type: LogisticsOperatorCalculatedData, required: true })
  logistics_operator2_calculated_data: LogisticsOperatorCalculatedData;

  @Prop({type: Product, required: true})
  product: Product

}

export const FreightSimulationSchema = SchemaFactory.createForClass(FreightSimulation);

