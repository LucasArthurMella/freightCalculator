import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Max, MaxLength, Min, MinLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { LogisticsOperatorMinMax } from "../constants/min-max-values";


class Distance {
  @IsOptional()
  @IsNumber()
  @Min(LogisticsOperatorMinMax.MinDistanceMinValue)
  @Max(LogisticsOperatorMinMax.MinDistanceMaxValue)
  min: number;

  @IsOptional()
  @IsNumber()
  @Min(LogisticsOperatorMinMax.MaxDistanceMinValue)
  @Max(LogisticsOperatorMinMax.MaxDistanceMaxValue)
  max: number;
}

class DistanceRule {
  @IsNotEmpty()
  @ValidateNested()
  @IsObject()
  @Type(() => Distance)
  distance: Distance;

  @IsNotEmpty()
  @IsNumber()
  @Min(LogisticsOperatorMinMax.DistanceMultipleMinValue)
  @Max(LogisticsOperatorMinMax.DistanceMultipleMaxValue)
  distance_multiple: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(LogisticsOperatorMinMax.EstimatedTimeOfArrivalMinValue)
  @Max(LogisticsOperatorMinMax.EstimatedTimeOfArrivalMaxValue)
  estimated_time_of_arrival: number;
}

export class CreateLogisticsOperatorDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(LogisticsOperatorMinMax.NameMinValue)
  @MaxLength(LogisticsOperatorMinMax.NameMaxValue)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(LogisticsOperatorMinMax.CostDividerMinValue)
  @Max(LogisticsOperatorMinMax.CostDividerMaxValue)
  cost_divider: number;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => DistanceRule)
  distance_rules: DistanceRule[]
}
