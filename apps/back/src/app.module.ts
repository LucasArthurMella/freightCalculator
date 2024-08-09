import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FreightSimulationModule } from './freight-simulation/freight-simulation.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LogisticsOperatorModule } from './logistics-operator/logistics-operator.module';

@Module({
  imports: [MongooseModule.forRoot("mongodb://127.0.0.1/freightCalculator"), FreightSimulationModule, LogisticsOperatorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
