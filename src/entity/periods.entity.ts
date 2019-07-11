import { Column, Entity, PrimaryGeneratedColumn, OneToMany, Timestamp } from 'typeorm';
import { BookingEntity } from './booking.entity';

@Entity('periods')
export class PeriodsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date" })
  startingDate: Date;

  @Column({ type: "date" })
  finishingDate: Date;


  @OneToMany(type => BookingEntity, booking => booking.period)
  booking: BookingEntity[];

  

}