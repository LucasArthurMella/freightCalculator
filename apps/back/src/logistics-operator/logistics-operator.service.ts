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
    const createdLogisticsOperator = await this.logisticOperatorModel.create(createLogisticsOperatorDto);
    return createdLogisticsOperator;
  }

  async findAll() {
    const listedLogisticsOperator = await this.logisticOperatorModel.find();
    return listedLogisticsOperator;
  }

  async findOne(id: string) {
    const foundLogisticsOperator = await this.logisticOperatorModel.findById(id);
    return foundLogisticsOperator;
  }

  async update(id: string, updateLogisticsOperatorDto: UpdateLogisticsOperatorDto) {
    const updatedLogisticsOperator = await this.logisticOperatorModel.findByIdAndUpdate(id, updateLogisticsOperatorDto);
    return updatedLogisticsOperator;
  }

  async remove(id: string) {
    const removedLogisticsOperator = await this.logisticOperatorModel.findByIdAndDelete(id);
    return removedLogisticsOperator;
  }

  // Given a certain distance and a certain logistics operator, the function loops through the rules until it finds
  // the min max criteria that matches to that given distance, if it finishes looping and no rule is returned (meaning
  // that the min max criteria are wrongly defined) it just returns the first rule of that logistic operator. The min
  // is meant to be exclusive and the max inclusive

  async getLogisticsOperatorDistanceRule(logisticsOperatorId: string, distance: number ){
    const logisticsOperator = await this.findOne(logisticsOperatorId);

    for(let i = 0; i < logisticsOperator.distance_rules.length; i++){
      const currentRule = logisticsOperator.distance_rules[i];
      if(currentRule.distance.min && currentRule.distance.max){
        if(distance > currentRule.distance.min && distance <= currentRule.distance.max){
          return currentRule;
        }
      }else if (currentRule.distance.min){
        if(distance > currentRule.distance.min){
          return currentRule;
        }
      }else if (currentRule.distance.max){
        if(distance <= currentRule.distance.max){
          return currentRule;
        }
      }
    }
    return logisticsOperator.distance_rules[0]; 
  }



}
