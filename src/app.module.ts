import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HouseModule } from './house/house.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    HouseModule,
    BookingModule
  ],
  providers: [],
})
export class ApplicationModule { }
