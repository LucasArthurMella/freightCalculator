import { Injectable } from '@nestjs/common';
import { CreateFreightSimulationDto } from './dto/create-freight-simulation.dto';
import { UpdateFreightSimulationDto } from './dto/update-freight-simulation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FreightSimulation } from './entities/freight-simulation.entity';
import { Model } from 'mongoose';

@Injectable()
export class FreightSimulationService {
  constructor(@InjectModel(FreightSimulation.name) private freightSimulationModel: Model<FreightSimulation>) {} 

  create(createFreightSimulationDto: CreateFreightSimulationDto) {
    return 'This action adds a new freightSimulation';
  }

  findAll() {
    return `This action returns all freightSimulation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} freightSimulation`;
  }

  update(id: number, updateFreightSimulationDto: UpdateFreightSimulationDto) {
    return `This action updates a #${id} freightSimulation`;
  }

  remove(id: number) {
    return `This action removes a #${id} freightSimulation`;
  }
}
