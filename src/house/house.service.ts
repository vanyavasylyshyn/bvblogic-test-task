import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HouseEntity } from '../entity/houseInfo.entity';
import { PeriodsEntity } from '../entity/periods.entity';
import { BlockedEntity } from '../entity/blocked.entity';
import { BookingEntity } from '../entity/booking.entity';



@Injectable()
export class HouseService {
  constructor(
    @InjectRepository(HouseEntity)
    private readonly houseRepository: Repository<HouseEntity>,
    @InjectRepository(PeriodsEntity)
    private readonly periodRepository: Repository<PeriodsEntity>,
    @InjectRepository(BlockedEntity)
    private readonly blockedRepository: Repository<BlockedEntity>,
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
  ) { }

  

}
