import { PartialType } from '@nestjs/mapped-types';
import { CreateGoogleGeocodingDto } from './create-google-geocoding.dto';

export class UpdateGoogleGeocodingDto extends PartialType(CreateGoogleGeocodingDto) {}
