import { BadRequestException } from "@nestjs/common";
import { isValidObjectId } from "mongoose";

export const checkMongoIdValidity = (id: string) => {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid Mongo ObjectId');
    }
}
