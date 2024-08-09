import { Module } from '@nestjs/common';
import { FreightSimulationService } from './freight-simulation.service';
import { FreightSimulationController } from './freight-simulation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FreightSimulation, FreightSimulationSchema } from './entities/freight-simulation.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: FreightSimulation.name, schema: FreightSimulationSchema }])],
  controllers: [FreightSimulationController],
  providers: [FreightSimulationService],
})
export class FreightSimulationModule {}
