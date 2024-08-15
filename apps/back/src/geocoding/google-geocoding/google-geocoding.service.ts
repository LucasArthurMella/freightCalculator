import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, LatLngLiteral } from '@googlemaps/google-maps-services-js';
import { GeocodingService } from '../interfaces-types/GeocodingService';
import { coordinates } from '../interfaces-types/general';
import { getDistance } from 'geolib';

@Injectable()
export class GoogleGeocodingService extends Client implements GeocodingService {

  constructor(
    private configService: ConfigService,
  ){
    super();
  }
  /**
    Uses a full address to get a coordinate using google geocode api.
  */
  async getCoordinates(fullAddress: string): Promise<LatLngLiteral> {
    let geocodingKey = this.configService.get("googleGeocodingApiKey");
    let googleRes: any; 
    try{ 
      googleRes = await this.geocode({
        params: {
          address: fullAddress,
          key: geocodingKey 
        }
      }) 
    }catch(e){
      throw new InternalServerErrorException("Google Geocode Api Key is not correct!")
    }
    
    const coordinates = googleRes?.data?.results[0]?.geometry?.location;

    if(coordinates) {  
      const {lat, lng} = googleRes?.data?.results[0]?.geometry?.location;
      return {lat, lng};
    }else{
      return undefined;
    }

  }
  
  /**
    Uses geographic library to get distance between two coordinates and divides it by 1000
    to get it in km.
  */
  getDistanceInKm(coordinate1: coordinates, coordinate2: coordinates): number {
    const distance = getDistance(
      { latitude: coordinate1.lat, longitude: coordinate1.lng },
      { latitude: coordinate2.lat, longitude: coordinate2.lng }
    );
    return distance / 1000;
  }

}
