import { Test, TestingModule } from '@nestjs/testing';
import { FreightSimulationService } from './freight-simulation.service';
import { FreightSimulation } from './entities/freight-simulation.entity';
import { getModelToken } from '@nestjs/mongoose';
import { LogisticsOperatorService } from 'src/logistics-operator/logistics-operator.service';
import { GeocodingModule } from 'src/geocoding/geocoding.module';
import { LogisticsOperator, LogisticsOperatorDocument } from 'src/logistics-operator/entities/logistics-operator.schema';
import { ConfigService } from '@nestjs/config';
import { Address } from './dto/freight-simulation-request.dto';
import { coordinates } from 'src/geocoding/interfaces-types/general';
import { FreightSimulationGeneral } from './constants/general';


describe('FreightSimulationService', () => {
  let service: FreightSimulationService;
  let mockFindOneByBody = jest.fn();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FreightSimulationService,
        LogisticsOperatorService,
        GeocodingModule.getProvider("google"),
        ConfigService,
        { provide: getModelToken(FreightSimulation.name), useValue: jest.fn() },
        { provide: getModelToken(LogisticsOperator.name), useValue: {findOne: mockFindOneByBody} },
      ],
    }).compile();

    service = module.get<FreightSimulationService>(FreightSimulationService);

    mockFindOneByBody.mockImplementation(() => {
      return Promise.resolve({
        status: "Logistics operator does not exist, handling static logistics operator" 
      });
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should return a normal logistics operator", async () => {
    const mockLogisticsOperator = {
      name: "Logistics Operator Example"
    };
    const logisticsOperator = await service.handleLogisticsOperatorExistance(mockLogisticsOperator as LogisticsOperatorDocument, 0);
    expect(logisticsOperator).toEqual(mockLogisticsOperator);
  });

  it("should handle a static logistics operator instead of returning the same logistics operator (which is undefined)", async () => {
    const logisticsOperator = await service.handleLogisticsOperatorExistance(undefined, 0);
    expect(logisticsOperator).toEqual({status: "Logistics operator does not exist, handling static logistics operator"});
  });


  it("should return appropriate full address with full address given", () => {
    const address: Address = new Address();
    address.street = "Avenida Guedner";
    address.number = "255";
    address.city = "Maringá";
    address.state = "Paraná";
    address.zip_code = "87065-610";

    const fullAddress = service.formatFullAddress(address);
    expect(fullAddress).toBe("Avenida Guedner 255 Maringa Parana 87065-610");
  });

  it("should return appropriate full address with full address given without all fields", () => {
    const address: Address = new Address();
    address.street = "Avenida Guedner";
    address.city = "Maringá";
    address.state = "Paraná";

    const fullAddress = service.formatFullAddress(address);
    expect(fullAddress).toBe("Avenida Guedner Maringa Parana");
  });

  it("should return the appropriate distance", async() => {
    const coordinates1: coordinates = {lat: -23.410272, lng: -52.0509556} 
    const coordinates2: coordinates = {lat: -23.321258, lng: -51.2481638}
  
    const distance = await service.getDistance(coordinates1, coordinates2);
    expect(Math.floor(distance)).toBe(82);
  });

  it("should return appropriate cost per cubic weight", () => {
    const height = 50;
    const width = 55;
    const length = 33;
    const cost_divider = 6000;
    const expectedCostPerWeight = (height * width * length) / cost_divider // 15.125
    const costPerWeight = service.getCostPerCubicWeight({height, width, length}, cost_divider);

    expect(costPerWeight).toBe(expectedCostPerWeight);
  });

  it("should return minimum cost per weight when total cost per cubic weight is less than this minimum", () => {
    const height = 20;
    const width = 35;
    const length = 33;
    const cost_divider = 6000;
    (height * width * length) / cost_divider // 3.85 

    const costPerWeight = service.getCostPerCubicWeight({height, width, length}, cost_divider);

    expect(costPerWeight).toBe(FreightSimulationGeneral.minimumCostPerCubicWeight);
  })

  it("should return appropriate cost", () => {
    const costPerWeight = 7;
    const distanceMultiple = 1.6;
    const expectedCost = costPerWeight * distanceMultiple;
    const cost = service.getCost(costPerWeight, distanceMultiple);
    expect(cost).toBe(expectedCost);
  });

  const mockLogisticsOperator1 = {};
  const mockLogisticsOperator2 = {};

  it("should return logisticsOperator 1", async () => {
    const logisticsOperatorGroup1 = {number: 2, logisticsOperator: mockLogisticsOperator1 as any};
    const logisticsOperatorGroup2 = {number: 3, logisticsOperator: mockLogisticsOperator2 as any};
    const lowestLogisticOperatorByNumber = service.getLowestLogisticsOperatorByNumber(logisticsOperatorGroup1, logisticsOperatorGroup2);
    expect(lowestLogisticOperatorByNumber).toBe(mockLogisticsOperator1);
  });

  it("should return logisticsOperator 2", async () => {
    const logisticsOperatorGroup1 = {number: 3, logisticsOperator: mockLogisticsOperator1 as any};
    const logisticsOperatorGroup2 = {number: 2, logisticsOperator: mockLogisticsOperator2 as any};
    const lowestLogisticOperatorByNumber = service.getLowestLogisticsOperatorByNumber(logisticsOperatorGroup1, logisticsOperatorGroup2);
    expect(lowestLogisticOperatorByNumber).toBe(mockLogisticsOperator2);
  });

  it("should return undefined", async () => {
    const logisticsOperatorGroup1 = {number: 2, logisticsOperator: mockLogisticsOperator1 as any};
    const logisticsOperatorGroup2 = {number: 2, logisticsOperator: mockLogisticsOperator2 as any};
    const lowestLogisticOperatorByNumber = service.getLowestLogisticsOperatorByNumber(logisticsOperatorGroup1, logisticsOperatorGroup2);
    expect(lowestLogisticOperatorByNumber).toBe(undefined);
  });

});















