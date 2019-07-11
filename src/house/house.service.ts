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

  //
  //
  //get house info
  //
  //

  async getHouseInfo(id: number): Promise<HouseEntity> {

    let house = await this.houseRepository.findOne(id);

    if (house === undefined) {

      const errors = { message: 'Such house id doen\'t exist.' };
      throw new HttpException({ message: 'Input data validation failed.', errors }, HttpStatus.BAD_REQUEST);
    }

    return await house;
  };
  //
  //
  //edit house info
  //
  //

  async updateHouseInfo(id: number, dto: createHouseDto): Promise<HouseEntity> {

    let houseInfo = await this.houseRepository.findOne(id);

    if (houseInfo === undefined) {

      const errors = { message: 'Such house id doen\'t exist.' };
      throw new HttpException({ message: 'Input data validation failed.', errors }, HttpStatus.BAD_REQUEST);
    }

    houseInfo.name = dto.name || houseInfo.name;
    houseInfo.description = dto.description || houseInfo.description;
    houseInfo.minDuration = dto.minDuration || houseInfo.minDuration;
    houseInfo.adress = dto.adress || houseInfo.adress;
    houseInfo.srcImage = dto.srcImage || houseInfo.srcImage;
    houseInfo.dailyPrice = dto.dailyPrice || houseInfo.dailyPrice;
    houseInfo.weekendPrice = dto.weekendPrice || houseInfo.weekendPrice;
    houseInfo.discount = dto.discount || houseInfo.discount;

    let period = await this.periodRepository.query(`SELECT * FROM periods WHERE id IN(SELECT periodId FROM blocked WHERE blocked.houseId = ${id})`);

    period[0].startingDate = dto.blockedStart || period[0].startingDate;
    period[0].finishingDate = dto.blockedFinish || period[0].finishingDate;

    await this.periodRepository.save(period);

    return await this.houseRepository.save(houseInfo);
  }

  //
  //
  //delete house
  //
  //

  async deleteHouse(id: number): Promise<any> {

    let house = await this.houseRepository.findOne(id);

    if (house === undefined) {

      const errors = { message: 'Such house id doen\'t exist.' };
      throw new HttpException({ message: 'Input data validation failed.', errors }, HttpStatus.BAD_REQUEST);
    }


    let booking = await this.bookingRepository.findOne({ where: { house: house } });
    let blocked = await this.blockedRepository.findOne({ where: { house: house } });
    if (booking !== undefined) {
      await this.periodRepository.query(`DELETE FROM periods WHERE id IN(SELECT periodId FROM booking WHERE booking.houseId = ${id})`);
      await this.bookingRepository.delete(booking);
    }

    if (blocked !== undefined) {
      await this.periodRepository.query(`DELETE FROM periods WHERE id IN(SELECT periodId FROM blocked WHERE blocked.houseId = ${id})`);
      await this.blockedRepository.delete(blocked);
    }

    return await this.houseRepository.delete(id);
  }

  //
  //
  //setting house image
  //
  //

  async setHouseImage(id: number, houseImageSrc: string) {
    await this.houseRepository.update(id, { srcImage: houseImageSrc });
  }
  
}
