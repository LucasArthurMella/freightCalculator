import { Test, TestingModule } from '@nestjs/testing';
import { GoogleGeocodingService } from './google-geocoding.service';
import { ConfigService } from '@nestjs/config';
import { coordinates } from '../interfaces-types/general';

describe('GoogleGeocodingService', () => {
  let service: GoogleGeocodingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GoogleGeocodingService,
        ConfigService
      ],
    }).compile();

    service = module.get<GoogleGeocodingService>(GoogleGeocodingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("to get appropriate distance in kms", () => {
    const coordinates1: coordinates = {lat: -23.410272, lng: -52.0509556} 
    const coordinates2: coordinates = {lat: -23.321258, lng: -51.2481638}

    const distance = service.getDistanceInKm(coordinates1, coordinates2);
    expect(Math.floor(distance)).toBe(82);
  });

});
