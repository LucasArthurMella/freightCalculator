import { Module } from '@nestjs/common';
import { GoogleGeocodingService } from './google-geocoding.service';
import { GoogleGeocodingController } from './google-geocoding.controller';

@Module({
  controllers: [GoogleGeocodingController],
  providers: [GoogleGeocodingService],
})
export class GoogleGeocodingModule {}
