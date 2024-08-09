import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LogisticsOperatorService } from './logistics-operator.service';
import { CreateLogisticsOperatorDto } from './dto/create-logistics-operator.dto';
import { UpdateLogisticsOperatorDto } from './dto/update-logistics-operator.dto';

@Controller('logistics-operator')
export class LogisticsOperatorController {
  constructor(private readonly logisticsOperatorService: LogisticsOperatorService) {}

  @Post()
  create(@Body() createLogisticsOperatorDto: CreateLogisticsOperatorDto) {
    return this.logisticsOperatorService.create(createLogisticsOperatorDto);
  }

  @Get()
  findAll() {
    return this.logisticsOperatorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logisticsOperatorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLogisticsOperatorDto: UpdateLogisticsOperatorDto) {
    return this.logisticsOperatorService.update(id, updateLogisticsOperatorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logisticsOperatorService.remove(id);
  }
}
