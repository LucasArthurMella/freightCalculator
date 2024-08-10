import { Module } from '@nestjs/common';
import { FreightSimulationService } from './freight-simulation.service';
import { FreightSimulationController } from './freight-simulation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FreightSimulation, FreightSimulationSchema } from './entities/freight-simulation.entity';
import { LogisticsOperatorModule } from 'src/logistics-operator/logistics-operator.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: FreightSimulation.name, schema: FreightSimulationSchema }]),
    LogisticsOperatorModule
  ],
  controllers: [FreightSimulationController],
  providers: [FreightSimulationService],
})
export class FreightSimulationModule {}
