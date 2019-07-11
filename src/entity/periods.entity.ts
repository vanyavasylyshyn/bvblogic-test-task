import { Column, Entity, PrimaryGeneratedColumn, OneToMany, Timestamp } from 'typeorm';
import { BookingEntity } from './booking.entity';
import { BlockedEntity } from './blocked.entity';

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

  @OneToMany(type => BlockedEntity, blocked => blocked.period)
  blocked: BlockedEntity[];

}