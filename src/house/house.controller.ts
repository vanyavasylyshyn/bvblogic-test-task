import { Controller, Post, Body, Get, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';

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

  @Delete('deleteHouse/:houseId')
  async deleteHouse(@Param() params): Promise<any> {
    this.houseService.deleteHouse(params.houseId);
  }

  @Post('image/:houseId')
  @UseInterceptors(FileInterceptor('file',
    {
      storage: diskStorage({
        destination: './houseImages',
        filename: (req ,file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        }
      })
    }
  )
  )
  async uploadHouseImage(@Param() params, @UploadedFile() file): Promise<any> {
    return await this.houseService.setHouseImage(params.houseId,`${file.path}`);
  }
  
}
