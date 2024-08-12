import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { UserMinMax } from "../constants/min-max-values";

export class UserDto {

  @IsNotEmpty()
  @IsString()
  @MinLength(UserMinMax.MinLoginLength)
  @MaxLength(UserMinMax.MaxLoginLength)
  login: string;
  
  @IsNotEmpty()
  @IsString()
  @MinLength(UserMinMax.MinPasswordLength)
  @MaxLength(UserMinMax.MaxPasswordLength)
  password: string;

}
