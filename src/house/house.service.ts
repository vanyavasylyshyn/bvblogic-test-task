import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HouseEntity } from '../entity/houseInfo.entity';
import { PeriodsEntity } from '../entity/periods.entity';
import { BlockedEntity } from '../entity/blocked.entity';
import { BookingEntity } from '../entity/booking.entity';

import { createHouseDto } from './dto/createHouse.dto';



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

  //
  //
  //Creating house
  //
  //
  
  async create(dto: createHouseDto): Promise<any> {

    let house = await this.houseRepository.findOne({
      where: [{ name: dto.name },
      { adress: dto.adress }]
    });

    if (house) {
      const errors = { message: 'House or adress already exist.' };
      throw new HttpException({ message: 'Input data validation failed.', errors }, HttpStatus.BAD_REQUEST);
    }

    house = new HouseEntity();
    house.name = dto.name;
    house.description = dto.description;
    house.minDuration = dto.minDuration;
    house.adress = dto.adress;
    house.dailyPrice = dto.dailyPrice;
    house.weekendPrice = dto.weekendPrice;
    house.discount = dto.discount;


    if (dto.blockedStart && dto.blockedFinish) {
      let period = new PeriodsEntity();
      period.startingDate = dto.blockedStart;
      period.finishingDate = dto.blockedFinish;

      let blocked = new BlockedEntity();
      blocked.period = period;
      blocked.house = house;
      blocked.house = house;
      blocked.period = period;

      await this.houseRepository.save(house);

      return await this.blockedRepository.save(blocked);
    } else {
      return await this.houseRepository.save(house);
    }
  };

}
