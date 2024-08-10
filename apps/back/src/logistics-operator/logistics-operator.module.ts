import { Module } from '@nestjs/common';
import { LogisticsOperatorService } from './logistics-operator.service';
import { LogisticsOperatorController } from './logistics-operator.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LogisticsOperator, LogisticsOperatorSchema } from './entities/logistics-operator.schema';

@Module({
  imports:[MongooseModule.forFeature([{name: LogisticsOperator.name, schema: LogisticsOperatorSchema}])],
  controllers: [LogisticsOperatorController],
  providers: [LogisticsOperatorService],
  exports: [LogisticsOperatorService]
})
export class LogisticsOperatorModule {}
