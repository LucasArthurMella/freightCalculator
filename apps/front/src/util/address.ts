import { Address } from "../interfaces-types/freight-simulation";


export function formatFullAddress(address: Address){
    let fullAddress = "";
    if(address.street) fullAddress += `${address.street} `;
    if(address.number) fullAddress += `${address.number} `;
    if(address.city) fullAddress += `${address.city}`;
    if(address.state) fullAddress += ` ${address.state}`;
    if(address.zip_code) fullAddress += ` ${address.zip_code}`;
    return fullAddress;
  }
