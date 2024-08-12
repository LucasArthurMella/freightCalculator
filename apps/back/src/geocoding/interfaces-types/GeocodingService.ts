import { coordinates } from "./general"

export interface GeocodingService {
  getCoordinates(fullAddress: string): Promise<coordinates>,
  getDistanceInKm(coordinate1: coordinates, coordinate2: coordinates): number
}
