import { Test, TestingModule } from '@nestjs/testing';
import { LogisticsOperatorService } from './logistics-operator.service';

describe('LogisticsOperatorService', () => {
  let service: LogisticsOperatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogisticsOperatorService],
    }).compile();

    service = module.get<LogisticsOperatorService>(LogisticsOperatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
