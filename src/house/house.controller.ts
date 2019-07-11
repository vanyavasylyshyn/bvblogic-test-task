import { Controller, Post, Body } from '@nestjs/common';

import { HouseService } from './house.service';

import { createHouseDto } from './dto/createHouse.dto';

@Controller('house')
export class HouseController {
  constructor(private readonly houseService: HouseService) { }

  @Post('create')
  async create(@Body() houseData: createHouseDto): Promise<any> {
    return await this.houseService.create(houseData);
  }
  
}
