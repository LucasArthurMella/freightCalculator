import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FreightSimulation } from './entities/freight-simulation.entity';
import { Model } from 'mongoose';
import { Address, FreightSimulationRequestDto } from './dto/freight-simulation-request.dto';
import { LogisticsOperatorService } from'src/logistics-operator/logistics-operator.service';
import { FreightSimulationGeneral } from './constants/general';
import { NumberLogisticsOperatorGroup } from './interfaces-types/NumberOperatorGroup';
import { GeocodingService } from 'src/geocoding/interfaces-types/GeocodingService';
import { GEOCODING_SERVICE } from 'src/geocoding/constants/general';
import { coordinates } from 'src/geocoding/interfaces-types/general';

@Injectable()
export class FreightSimulationService {
  constructor(
    @InjectModel(FreightSimulation.name) private freightSimulationModel: Model<FreightSimulation>,
    private readonly logisticsOperatorService: LogisticsOperatorService,
    @Inject(GEOCODING_SERVICE)private readonly geocodingService: GeocodingService
  ) {} 

  async handleFreightRequestData(freightSimulationRequestDto: FreightSimulationRequestDto) {
    const {height, width, length, logistics_operator1_id, logistics_operator2_id, origin_address, destination_address} = freightSimulationRequestDto; 
    const logisticsOperator1 = await this.logisticsOperatorService.findOne(logistics_operator1_id);
    const logisticsOperator2 = await this.logisticsOperatorService.findOne(logistics_operator2_id);
    
    const fullAddress1 = this.formatFullAddress(origin_address);
    const fullAddress2 = this.formatFullAddress(destination_address);

    const coordinates1 = await this.getGeocodingCoordinates(fullAddress1);
    const coordinates2 = await this.getGeocodingCoordinates(fullAddress2);

    if(!coordinates1 || !coordinates2){
      throw new BadRequestException("Coordinates not found with provided address!");
    }

    const distance_between_addresses = await this.getDistance(coordinates1, coordinates2);

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

    const originAddressBody = {
      ...origin_address,
      coordinates: coordinates1
    } 

    const destinationAddressBody = {
      ...destination_address,
      coordinates: coordinates2
    }

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
        origin_address: originAddressBody,
        destination_address: destinationAddressBody,
      }
    }

    const createdFreightSimulation = await this.freightSimulationModel.create(freight_simulation_body);
    return createdFreightSimulation;
  }


  formatFullAddress(address: Address){
    let fullAddress = "";
    if(address.street) fullAddress += ` ${address.street}`;
    if(address.number) fullAddress += ` ${address.number} `;
    if(address.city) fullAddress += `${address.city}`;
    if(address.state) fullAddress += ` ${address.state}`;
    if(address.zip_code) fullAddress += ` ${address.zip_code}`;
    return fullAddress.normalize("NFD").replace(/\p{Diacritic}/gu, "");
  }


  async getGeocodingCoordinates(fullAddress: string){
    return await this.geocodingService.getCoordinates(fullAddress);
  }

  async getDistance(coordinates1: coordinates, coordinates2: coordinates){
      const distance = this.geocodingService.getDistanceInKm(coordinates1, coordinates2);
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

  async findAll() {
    return await this.freightSimulationModel.find({});
  }

  async findOne(id: number) {
    return await this.freightSimulationModel.findById(id);
  }

}
