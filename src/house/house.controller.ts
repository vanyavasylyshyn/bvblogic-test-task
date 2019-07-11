import { Controller, Post, Body, Get, Param } from '@nestjs/common';

import { HouseService } from './house.service';

import { createHouseDto } from './dto/createHouse.dto';

import { HouseEntity } from '../entity/houseInfo.entity';

@Controller('house')
export class HouseController {
  constructor(private readonly houseService: HouseService) { }

  @Get(':houseId')
  async getHouse(@Param() params): Promise<HouseEntity> {
    return await this.houseService.getHouseInfo(params.houseId);
  }

  @Post('create')
  async create(@Body() houseData: createHouseDto): Promise<any> {
    return await this.houseService.create(houseData);
  }

  @Post('updateInfo/:houseId')
  async updateHouseInfo(@Param() params, @Body() houseData: createHouseDto): Promise<HouseEntity> {
    return await this.houseService.updateHouseInfo(params.houseId, houseData);
  }
  
}
