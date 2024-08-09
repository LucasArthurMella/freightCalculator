import { PartialType } from '@nestjs/mapped-types';
import { CreateLogisticsOperatorDto } from './create-logistics-operator.dto';

export class UpdateLogisticsOperatorDto extends PartialType(CreateLogisticsOperatorDto) {}
