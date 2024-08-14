import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { FreightSimulationService } from './freight-simulation.service';
import { FreightSimulationRequestDto } from './dto/freight-simulation-request.dto';
import { BothLogisticsOperatorExistGuard } from './guards/BothLogisticsOperatorsExist';

@Controller('freight-simulation')
export class FreightSimulationController {
  constructor(private readonly freightSimulationService: FreightSimulationService) {}

  @Post()
  @UseGuards(BothLogisticsOperatorExistGuard)
  handleFreightRequestData(@Body() freightSimulationRequest: FreightSimulationRequestDto) {
    return this.freightSimulationService.handleFreightRequestData(freightSimulationRequest);
  }

  @Get()
  findAll() {
    return this.freightSimulationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.freightSimulationService.findOne(id);
  }

}
