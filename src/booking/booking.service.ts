import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BookingEntity } from '../entity/booking.entity';
import { GuestInfoEntity } from '../entity/guestInfo.entity';
import { HouseEntity } from '../entity/houseInfo.entity';
import { PeriodsEntity } from '../entity/periods.entity';

import { createBookingDto } from './dto/createBooking.dto';

import * as moment from 'moment';


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

  //
  //
  //Creating booking
  //
  //

  async createBooking(id: number, dto: createBookingDto): Promise<BookingEntity> {

    let startDate = moment(dto.startingDate);
    let finishDate = moment(dto.finishingDate);

    let daysLangth = finishDate.diff(startDate, 'days');

    const house = await this.houseRepository.findOne(id);

    if (house === undefined) {

      const errors = { message: 'Such house id doen\'t exist.' };
      throw new HttpException({ message: 'Input data validation failed.', errors }, HttpStatus.BAD_REQUEST);
    }

    if (daysLangth < house.minDuration) {
      const errors = { message: 'Number of days is less than minimal duration to stay on a house.' };
      throw new HttpException({ message: 'Input data validation failed.', errors }, HttpStatus.BAD_REQUEST);
    }


    let bookingFind = await this.houseRepository.query(`SELECT * FROM houseinfo 
    WHERE houseinfo.id = ${id} AND id IN 
      (SELECT houseId FROM booking 
    WHERE booking.status = true AND periodId IN 
      (SELECT id FROM periods 
    WHERE 
      "${dto.startingDate}" AND "${dto.finishingDate}" BETWEEN startingDate AND finishingDate 
    OR 
      "${dto.startingDate}" BETWEEN startingDate AND finishingDate 
    OR 
      "${dto.finishingDate}" BETWEEN startingDate AND finishingDate
    ))`);


    let blockedFind = await this.houseRepository.query(`SELECT * FROM houseinfo 
    WHERE houseinfo.id = ${id} AND id IN 
      (SELECT houseId FROM blocked 
    WHERE periodId IN 
      (SELECT id FROM periods 
    WHERE 
      "${dto.startingDate}" AND "${dto.finishingDate}" BETWEEN startingDate AND finishingDate 
    OR 
      "${dto.startingDate}" BETWEEN startingDate AND finishingDate 
    OR 
      "${dto.finishingDate}" BETWEEN startingDate AND finishingDate
    ))`);


    if (bookingFind.length > 0) {
      const errors = { message: 'Time period is already booked.' };
      throw new HttpException({ message: 'Input data validation failed.', errors }, HttpStatus.BAD_REQUEST);
    }

    if (blockedFind.length > 0) {
      const errors = { message: 'Time period is blocked for bookings.' };
      throw new HttpException({ message: 'Input data validation failed.', errors }, HttpStatus.BAD_REQUEST);
    }


    let guestInfo = new GuestInfoEntity();
    guestInfo.name = dto.name;
    guestInfo.surname = dto.surname;
    guestInfo.phonenumber = dto.phonenumber;

    let period = new PeriodsEntity();
    period.startingDate = dto.startingDate;
    period.finishingDate = dto.finishingDate;

    let booking = new BookingEntity();
    booking.guestChecked = false;
    booking.status = true;
    booking.guestInfo = guestInfo;
    booking.period = period;
    booking.house = house;
    booking.startingDate = dto.startingDate;
    booking.finishingDate = dto.finishingDate;

    return await this.bookingRepository.save(booking);
  };

  //
  //
  //cancel booking
  //
  //

  async cancelBooking(id: number) {

    let booking = await this.bookingRepository.findOne(id);

    if (booking === undefined) {

      const errors = { message: 'Such booking id doen\'t exist.' };
      throw new HttpException({ message: 'Input data validation failed.', errors }, HttpStatus.BAD_REQUEST);
    }

    booking.status = false;
    
    await this.periodRepository.query(`DELETE FROM periods WHERE id IN(SELECT periodId FROM booking WHERE booking.id = ${id})`);

    return await this.bookingRepository.save(booking);
  }

}
