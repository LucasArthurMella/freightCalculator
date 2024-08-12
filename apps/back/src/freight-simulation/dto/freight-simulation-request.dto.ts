import { IsMongoId, IsNotEmpty, IsNumber, IsNumberString, IsObject, IsOptional, IsString, Max, MaxLength, Min, MinLength, ValidateNested } from "class-validator";
import { FreightSimulationRequestMinMax } from "../constants/min-max-values";
import { GlobalMinMax } from "src/app/constants/min-max-values";
import { Type } from "class-transformer";
import { IsCEP } from "@clockinit/brazilian-class-validator";


export class Address {

  @IsOptional()
  @IsString()
  @MinLength(FreightSimulationRequestMinMax.StreetMinLength)
  @MaxLength(FreightSimulationRequestMinMax.StreetMaxLength)
  street: string;

  @IsOptional()
  @IsNumberString()
  @MinLength(FreightSimulationRequestMinMax.NumberMinLength)
  @MaxLength(FreightSimulationRequestMinMax.NumberMaxLength)
  number: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(FreightSimulationRequestMinMax.CityMinLength)
  @MaxLength(FreightSimulationRequestMinMax.CityMaxLength)
  city: string;

  @IsOptional()
  @IsString()
  @MinLength(FreightSimulationRequestMinMax.StateMinLength)
  @MaxLength(FreightSimulationRequestMinMax.StateMaxLength)
  state: string;

  @IsOptional()
  @IsCEP()
  @MinLength(FreightSimulationRequestMinMax.ZipCodeMinLength)
  @MaxLength(FreightSimulationRequestMinMax.ZipCodeMaxLength)
  zip_code: string;

}


export class FreightSimulationRequestDto{
  
  @IsNotEmpty()
  @IsMongoId()
  @MinLength(GlobalMinMax.MongooseIdMinLength)
  @MaxLength(GlobalMinMax.MongooseIdMaxLength)
  logistics_operator1_id: string;

  @IsNotEmpty()
  @IsMongoId()
  @MinLength(GlobalMinMax.MongooseIdMinLength)
  @MaxLength(GlobalMinMax.MongooseIdMaxLength)
  logistics_operator2_id: string; 

  @IsNotEmpty()
  @IsNumber()
  @Min(FreightSimulationRequestMinMax.ProductHeightMinValue)
  @Max(FreightSimulationRequestMinMax.ProductHeightMaxValue)
  height: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(FreightSimulationRequestMinMax.ProductWidthMinValue)
  @Max(FreightSimulationRequestMinMax.ProductWidthMaxValue)
  width: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(FreightSimulationRequestMinMax.ProductLengthMinValue)
  @Max(FreightSimulationRequestMinMax.ProductLengthMaxValue)
  length: number;

  @IsNotEmpty()
  @ValidateNested()
  @IsObject()
  @Type(() => Address)
  origin_address: Address;

  @IsNotEmpty()
  @ValidateNested()
  @IsObject()
  @Type(() => Address)
  destination_address: Address;

}
