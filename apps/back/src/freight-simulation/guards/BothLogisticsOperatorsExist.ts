import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { LogisticsOperatorService } from 'src/logistics-operator/logistics-operator.service';

@Injectable()
export class BothLogisticsOperatorExistGuard implements CanActivate {
  constructor(private readonly logisticsOperatorService: LogisticsOperatorService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {

    const request = context.switchToHttp().getRequest();
    const logistics_operator1_id = request.body.logistics_operator1_id;
    const logistics_operator2_id = request.body.logistics_operator2_id;

    const logisticsOperator1 = await this.logisticsOperatorService.findOne(logistics_operator1_id);
    const logisticsOperator2 = await this.logisticsOperatorService.findOne(logistics_operator2_id);

    if(!logisticsOperator1 && !logisticsOperator2){
      throw new BadRequestException("Both logistics operator 1 and 2 do not exist!");
    }

    if(!logisticsOperator1){
      throw new BadRequestException("Logistics operator 1 does not exist!");
    }

    if(!logisticsOperator2){
      throw new BadRequestException("Logistics operator 2 does not exist!");
    }

    return true;
  }
}

