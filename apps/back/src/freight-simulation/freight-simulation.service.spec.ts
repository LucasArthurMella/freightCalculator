import { Test, TestingModule } from '@nestjs/testing';
import { FreightSimulationService } from './freight-simulation.service';

describe('FreightSimulationService', () => {
  let service: FreightSimulationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FreightSimulationService],
    }).compile();

    service = module.get<FreightSimulationService>(FreightSimulationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
