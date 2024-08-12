import { Controller, Get } from '@nestjs/common';
import { GoogleGeocodingService } from './google-geocoding.service';

@Controller('google-geocoding')
export class GoogleGeocodingController {
  constructor(private readonly googleGeocodingService: GoogleGeocodingService) {}

  @Get()
  getCoordinates() {
    return this.googleGeocodingService.getCoordinates("Rua Umuarama 277, Maringá PR");
  }
}
