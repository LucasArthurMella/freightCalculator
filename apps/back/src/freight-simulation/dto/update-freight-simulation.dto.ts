import { PartialType } from '@nestjs/mapped-types';
import { CreateFreightSimulationDto } from './create-freight-simulation.dto';

export class UpdateFreightSimulationDto extends PartialType(CreateFreightSimulationDto) {}
