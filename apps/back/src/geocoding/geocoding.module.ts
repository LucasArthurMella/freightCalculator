import { DynamicModule, Module, Provider } from '@nestjs/common';
import { Values } from "../app/interfaces-types/general"
import { geoCodingServices } from './constants/general';
import { GoogleGeocodingService } from './google-geocoding/google-geocoding.service';
import { GEOCODING_SERVICE } from './constants/general';

@Module({})
export class GeocodingModule {

  static getProvider(serviceType: Values<typeof geoCodingServices>){
    let serviceProvider: Provider;

    switch(serviceType){
      case geoCodingServices.google:
        serviceProvider = {
          provide: GEOCODING_SERVICE,
          useClass: GoogleGeocodingService
        }
      default: 
        serviceProvider = {
          provide: GEOCODING_SERVICE,
          useClass: GoogleGeocodingService
        }
    }
    return serviceProvider;
  }

  static forRoot(serviceType: Values<typeof geoCodingServices>): DynamicModule{
    let serviceProvider = this.getProvider(serviceType);
    return {
      module: GeocodingModule,
      providers: [serviceProvider],
      exports: [serviceProvider]
    }
  }

}
