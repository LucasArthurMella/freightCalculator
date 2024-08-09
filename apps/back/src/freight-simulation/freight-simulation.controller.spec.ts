import { Test, TestingModule } from '@nestjs/testing';
import { FreightSimulationController } from './freight-simulation.controller';
import { FreightSimulationService } from './freight-simulation.service';

describe('FreightSimulationController', () => {
  let controller: FreightSimulationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FreightSimulationController],
      providers: [FreightSimulationService],
    }).compile();

    controller = module.get<FreightSimulationController>(FreightSimulationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
