import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FreightSimulation } from './entities/freight-simulation.entity';
import { Model } from 'mongoose';
import { FreightSimulationRequestDto } from './dto/freight-simulation-request.dto';
import { LogisticsOperatorService } from'src/logistics-operator/logistics-operator.service';
import { FreightSimulationGeneral } from './constants/general';
import { NumberLogisticsOperatorGroup } from './interfaces/NumberOperatorGroup';

@Injectable()
export class FreightSimulationService {
  constructor(
    @InjectModel(FreightSimulation.name) private freightSimulationModel: Model<FreightSimulation>,
    private readonly logisticsOperatorService: LogisticsOperatorService 
  ) {} 

  async handleFreightRequestData(freightSimulationRequestDto: FreightSimulationRequestDto) {

    const {height, width, length, logistics_operator1_id, logistics_operator2_id, origin_address, destination_address} = freightSimulationRequestDto; 

    const logisticsOperator1 = await this.logisticsOperatorService.findOne(logistics_operator1_id);
    const logisticsOperator2 = await this.logisticsOperatorService.findOne(logistics_operator2_id);

    const distance_between_addresses = await this.getDistance(501);

    const logisticsOperator1Rule = await this.logisticsOperatorService.getLogisticsOperatorDistanceRule(logistics_operator1_id, distance_between_addresses);
    const logisticsOperator2Rule = await this.logisticsOperatorService.getLogisticsOperatorDistanceRule(logistics_operator2_id, distance_between_addresses);
    
    const logisticsOperator1CostPerWeight = this.getCostPerCubicWeight({height, width, length}, logisticsOperator1.cost_divider);
    const logisticsOperator2CostPerWeight = this.getCostPerCubicWeight({height, width, length}, logisticsOperator2.cost_divider);

    const logisticsOperator1Cost = this.getCost(logisticsOperator1CostPerWeight, logisticsOperator1Rule.distance_multiple);
    const logisticsOperator2Cost = this.getCost(logisticsOperator2CostPerWeight, logisticsOperator2Rule.distance_multiple);

    const cheapest_logistics_operator = this.getLowestLogisticsOperatorByNumber(
      {number: logisticsOperator1Cost, logisticsOperator: logisticsOperator1},
      {number: logisticsOperator2Cost, logisticsOperator: logisticsOperator2}
    );

    const fastest_logistics_operator = this.getLowestLogisticsOperatorByNumber(
      {number: logisticsOperator1Rule.estimated_time_of_arrival, logisticsOperator: logisticsOperator1},
      {number: logisticsOperator2Rule.estimated_time_of_arrival, logisticsOperator: logisticsOperator2}
    );

    const freight_simulation_body = {
      cheapest_logistics_operator,
      fastest_logistics_operator,
      logistics_operator1_calculated_data: {
        price: logisticsOperator1Cost,
        time_in_days: logisticsOperator1Rule.estimated_time_of_arrival
      },
      logistics_operator2_calculated_data: {
        price: logisticsOperator2Cost,
        time_in_days: logisticsOperator2Rule.estimated_time_of_arrival
      },
      product: {
        height,
        width,
        length,
        distance_between_addresses,
        origin_address,
        destination_address,
      }
    }

    const createdFreightSimulation = await this.freightSimulationModel.create(freight_simulation_body);
    return createdFreightSimulation;
  }

  async getDistance(distance: number){
    //To be implemented, will eventually receive two logistics_operator and calculate the distance between both
    return distance;
  }

  getCostPerCubicWeight(dimensions: {height: number, width: number, length: number}, cost_divider: number){
    const costPerCubicWeight = (dimensions.height * dimensions.width * dimensions.length) / cost_divider;
    if(costPerCubicWeight < FreightSimulationGeneral.minimumCostPerCubicWeight){
      return FreightSimulationGeneral.minimumCostPerCubicWeight;
    }
    return costPerCubicWeight;
  }

  getCost(costPerCubicWeight: number, distance_multiple: number){
    return costPerCubicWeight * distance_multiple;
  }

  getLowestLogisticsOperatorByNumber(group1: NumberLogisticsOperatorGroup, group2: NumberLogisticsOperatorGroup) {
    if (group1.number != group2.number){
      if(group1.number < group2.number){
        return group1.logisticsOperator;
      }else{
        return group2.logisticsOperator;
      }
    }else {
      return undefined;
    }
  }

  findAll() {
    return `This action returns all freightSimulation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} freightSimulation`;
  }

}
