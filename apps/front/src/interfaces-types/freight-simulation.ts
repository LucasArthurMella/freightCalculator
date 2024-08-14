
export interface Address {
  street: string,
  city: string,
  state: string,
  zip_code: string,
  number: string
  coordinates: {
    lat: number,
    lng: number,
    _id: string
  }
}

interface CalculatedData {
  price: number,
  time_in_days: number,
  _id: string
}

interface LogisticsOperator {
  _id: string,
  cost_divider: number,
  distance_rules: {
    distance: {
      _id: string,
      min: number,
      max: number
    }
    distance_multiple: number,
    estimated_time_of_arrival: number,
    _id: string
  }[],
  name: string
}

export interface IFreightSimulation {
  _id: string,
  cheapest_logistics_operator: LogisticsOperator,
  fastest_logistics_operator: LogisticsOperator,
  logistics_operator1_calculated_data: CalculatedData,
  logistics_operator2_calculated_data: CalculatedData,
  product: {
    height: number,
    width: number,
    length: number,
    distance_between_addresses: number,
    origin_address: Address,
    destination_address: Address,
    _id: string
  }

}

export function isFreightSimulation(obj: {} | IFreightSimulation): obj is IFreightSimulation {
  return (obj as IFreightSimulation)._id !== undefined;
}
