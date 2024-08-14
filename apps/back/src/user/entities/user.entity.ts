import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserMinMax } from '../constants/min-max-values';

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps: true})
export class User{

 @Prop({
   type: String,
   minlength: UserMinMax.MinLoginLength,
   maxlength: UserMinMax.MaxLoginLength,
   required: true
 })
 login: string;

 @Prop({
   type: String,
   minlength: UserMinMax.MinPasswordLength,
   maxlength: UserMinMax.MaxPasswordLength,
   required: true
 })
 hash: string;

}


export const UserSchema = SchemaFactory.createForClass(User);
