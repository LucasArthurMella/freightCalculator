import { Test, TestingModule } from '@nestjs/testing';
import { GoogleGeocodingController } from './google-geocoding.controller';
import { GoogleGeocodingService } from './google-geocoding.service';

describe('GoogleGeocodingController', () => {
  let controller: GoogleGeocodingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoogleGeocodingController],
      providers: [GoogleGeocodingService],
    }).compile();

    controller = module.get<GoogleGeocodingController>(GoogleGeocodingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
