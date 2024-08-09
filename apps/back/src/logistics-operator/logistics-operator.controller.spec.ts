import { Test, TestingModule } from '@nestjs/testing';
import { LogisticsOperatorController } from './logistics-operator.controller';
import { LogisticsOperatorService } from './logistics-operator.service';

describe('LogisticsOperatorController', () => {
  let controller: LogisticsOperatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogisticsOperatorController],
      providers: [LogisticsOperatorService],
    }).compile();

    controller = module.get<LogisticsOperatorController>(LogisticsOperatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
