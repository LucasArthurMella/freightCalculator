import { Test, TestingModule } from '@nestjs/testing';
import { LogisticsOperatorService } from './logistics-operator.service';
import { LogisticsOperator } from './entities/logistics-operator.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('LogisticsOperatorService', () => {
  let service: LogisticsOperatorService;
  let mockFindOne = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LogisticsOperatorService,
        { provide: getModelToken(LogisticsOperator.name), useValue: {findById: mockFindOne } }
      ],
    }).compile();

    service = module.get<LogisticsOperatorService>(LogisticsOperatorService);

    mockFindOne.mockImplementation((id: string) => {
      if(id=="66bd4210a07b56cb85f5bbc3"){
      return Promise.resolve({
        distance_rules: [
          { distance: { max: 10 }, rule: 'Rule1' },
          { distance: { min: 10, max: 20 }, rule: 'Rule2' },
          { distance: { min: 20,  }, rule: 'Rule3' },
        ],
      });
      }else {
      return Promise.resolve({
        distance_rules: [
          { distance: { max: 10 }, rule: 'Rule1' },
          { distance: { min: 15, max: 30 }, rule: 'Rule2' },
        ],
      });

      }
    });

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return first rule', async () => {
    const rule = await service.getLogisticsOperatorDistanceRule("66bd4210a07b56cb85f5bbc3", 9);
    expect(rule).toEqual({ distance: { max: 10 }, rule: 'Rule1' });
  });

  it('should return first rule', async () => {
    const rule = await service.getLogisticsOperatorDistanceRule("66bd4210a07b56cb85f5bbc3", 10);
    expect(rule).toEqual({ distance: { max: 10 }, rule: 'Rule1' });
  });

  it('should return second rule', async () => {
    const rule = await service.getLogisticsOperatorDistanceRule("66bd4210a07b56cb85f5bbc3", 11);
    expect(rule).toEqual({ distance: { min: 10, max: 20 }, rule: 'Rule2' });
  });

  it('should return second rule', async () => {
    const rule = await service.getLogisticsOperatorDistanceRule("66bd4210a07b56cb85f5bbc3", 20);
    expect(rule).toEqual({ distance: { min: 10, max: 20 }, rule: 'Rule2' });
  });

  it('should return third rule', async () => {
    const rule = await service.getLogisticsOperatorDistanceRule("66bd4210a07b56cb85f5bbc3", 21);
    expect(rule).toEqual({ distance: { min: 20,  }, rule: 'Rule3' });
  });

  it('should return third rule', async () => {
    const rule = await service.getLogisticsOperatorDistanceRule("66bd4210a07b56cb85f5bbc3", 21);
    expect(rule).toEqual({ distance: { min: 20,  }, rule: 'Rule3' });
  });

  //uses another id to fall on the else of the mocked function
  it('should return first rule when object is wrongly defined', async () => {
    const rule = await service.getLogisticsOperatorDistanceRule("66bd425b0bdbd5be73f24c73", 13);
    expect(rule).toEqual({ distance: { max: 10 }, rule: 'Rule1' });
  });











});
