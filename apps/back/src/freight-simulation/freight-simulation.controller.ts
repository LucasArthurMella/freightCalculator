import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FreightSimulationService } from './freight-simulation.service';
import { CreateFreightSimulationDto } from './dto/create-freight-simulation.dto';
import { UpdateFreightSimulationDto } from './dto/update-freight-simulation.dto';

@Controller('freight-simulation')
export class FreightSimulationController {
  constructor(private readonly freightSimulationService: FreightSimulationService) {}

  @Post()
  create(@Body() createFreightSimulationDto: CreateFreightSimulationDto) {
    return this.freightSimulationService.create(createFreightSimulationDto);
  }

  @Get()
  findAll() {
    return this.freightSimulationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.freightSimulationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFreightSimulationDto: UpdateFreightSimulationDto) {
    return this.freightSimulationService.update(+id, updateFreightSimulationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.freightSimulationService.remove(+id);
  }
}
