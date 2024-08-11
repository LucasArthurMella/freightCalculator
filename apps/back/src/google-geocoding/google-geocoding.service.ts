import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class GoogleGeocodingService {

  constructor(private configService: ConfigService){}

  requestDistance(address: string) {
    let geocodingKey = this.configService.get("googleGeocodingApi");
    console.log(geocodingKey);
  }

}
