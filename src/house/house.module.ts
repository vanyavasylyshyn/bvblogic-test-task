import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HouseService } from './house.service';
import { HouseController } from './house.controller';

import { HouseEntity } from '../entity/houseInfo.entity';
import { PeriodsEntity } from '../entity/periods.entity';
import { BlockedEntity } from '../entity/blocked.entity';
import { BookingEntity } from '../entity/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HouseEntity, PeriodsEntity, BlockedEntity, BookingEntity])],
  providers: [HouseService],
  controllers: [HouseController],
})
export class HouseModule { }
