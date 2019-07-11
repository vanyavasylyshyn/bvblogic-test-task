import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';

import { BookingEntity } from '../entity/booking.entity';
import { GuestInfoEntity } from '../entity/guestInfo.entity';
import { PeriodsEntity } from '../entity/periods.entity'
import { HouseEntity } from '../entity/houseInfo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookingEntity, GuestInfoEntity, PeriodsEntity, HouseEntity])],
  providers: [BookingService],
  controllers: [BookingController],
})
export class BookingModule { }
