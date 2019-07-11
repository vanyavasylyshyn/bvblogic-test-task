import { Controller, Post, Param, Body } from '@nestjs/common';

import { BookingService } from './booking.service';

import { createBookingDto } from './dto/createBooking.dto';

import { BookingEntity } from '../entity/booking.entity';




@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  @Post('/create/:houseId')
  async createBooking(@Param() params, @Body() bookingData: createBookingDto): Promise<BookingEntity> {
    return await this.bookingService.createBooking(params.houseId, bookingData);
  }
  
}
