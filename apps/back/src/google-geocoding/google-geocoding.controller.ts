import { Controller, Get } from '@nestjs/common';
import { GoogleGeocodingService } from './google-geocoding.service';

@Controller('google-geocoding')
export class GoogleGeocodingController {
  constructor(private readonly googleGeocodingService: GoogleGeocodingService) {}

  @Get()
  get() {
    return this.googleGeocodingService.requestDistance("AaaaaaaaaaaA");
  }
}
