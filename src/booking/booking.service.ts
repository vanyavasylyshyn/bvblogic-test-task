import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BookingEntity } from '../entity/booking.entity';
import { GuestInfoEntity } from '../entity/guestInfo.entity';
import { HouseEntity } from '../entity/houseInfo.entity';
import { PeriodsEntity } from '../entity/periods.entity';




@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
    @InjectRepository(GuestInfoEntity)
    private readonly guestInfoRepository: Repository<GuestInfoEntity>,
    @InjectRepository(HouseEntity)
    private readonly houseRepository: Repository<HouseEntity>,
    @InjectRepository(PeriodsEntity)
    private readonly periodRepository: Repository<PeriodsEntity>,
  ) { }

  

}
