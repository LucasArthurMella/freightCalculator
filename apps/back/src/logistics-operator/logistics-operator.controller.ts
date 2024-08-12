import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LogisticsOperatorService } from './logistics-operator.service';
import { CreateLogisticsOperatorDto } from './dto/create-logistics-operator.dto';
import { UpdateLogisticsOperatorDto } from './dto/update-logistics-operator.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('logistics-operator')
export class LogisticsOperatorController {
  constructor(private readonly logisticsOperatorService: LogisticsOperatorService) {}

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLogisticsOperatorDto: UpdateLogisticsOperatorDto) {
    return this.logisticsOperatorService.update(id, updateLogisticsOperatorDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logisticsOperatorService.remove(id);
  }
}
