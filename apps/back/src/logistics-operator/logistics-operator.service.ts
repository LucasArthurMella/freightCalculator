import { Injectable } from '@nestjs/common';
import { CreateLogisticsOperatorDto } from './dto/create-logistics-operator.dto';
import { UpdateLogisticsOperatorDto } from './dto/update-logistics-operator.dto';
import { InjectModel } from '@nestjs/mongoose';
import { LogisticsOperator } from './entities/logistics-operator.schema';
import { Model } from 'mongoose';
import { create } from 'domain';

@Injectable()
export class LogisticsOperatorService {
  constructor(@InjectModel(LogisticsOperator.name) private logisticOperatorModel: Model<LogisticsOperator>){}

  async create(createLogisticsOperatorDto: CreateLogisticsOperatorDto) {
    try{
      const createdLogisticsOperator = await this.logisticOperatorModel.create(createLogisticsOperatorDto);
      return createdLogisticsOperator;
    }catch(e){
      return e;
    }
  }

  async findAll() {
    try{
      const listedLogisticsOperator = await this.logisticOperatorModel.find();
      return listedLogisticsOperator;
    }catch(e){
      return e;
    }
  }

  async findOne(id: string) {
    try{
      const foundLogisticsOperator = await this.logisticOperatorModel.findById(id);
      return foundLogisticsOperator;
    }catch(e){
      return e;
    }
  }

  async update(id: string, updateLogisticsOperatorDto: UpdateLogisticsOperatorDto) {
    try{
      const updatedLogisticsOperator = await this.logisticOperatorModel.findByIdAndUpdate(id, updateLogisticsOperatorDto);
      return updatedLogisticsOperator;
    }catch(e){
      return e;
    }
  }

  async remove(id: string) {
    try{
      const removedLogisticsOperator = await this.logisticOperatorModel.findByIdAndDelete(id);
      return removedLogisticsOperator;
    }catch(e){
      return e;
    }
  }

}
