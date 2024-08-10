import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FreightSimulationService } from './freight-simulation.service';
import { UpdateFreightSimulationDto } from './dto/update-freight-simulation.dto';
import { FreightSimulationRequestDto } from './dto/freight-simulation-request.dto';
import { BothLogisticsOperatorExistGuard } from './guards/BothLogisticsOperatorsExist';

@Controller('freight-simulation')
export class FreightSimulationController {
  constructor(private readonly freightSimulationService: FreightSimulationService) {}

  @UseGuards(BothLogisticsOperatorExistGuard)
  @Post()
  handleFreightRequestData(@Body() freightSimulationRequest: FreightSimulationRequestDto) {
    return this.freightSimulationService.handleFreightRequestData(freightSimulationRequest);
  }

  @Get()
  findAll() {
    return this.freightSimulationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.freightSimulationService.findOne(+id);
  }

}
