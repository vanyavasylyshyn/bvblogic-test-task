import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BookingEntity } from './booking.entity';

@Entity('guestInfo')
export class GuestInfoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 20 })
  name: string;

  @Column({ nullable: false, length: 30 })
  surname: string;

  @Column({ nullable: false, length: 15 })
  phonenumber: string;

  @OneToMany(type => BookingEntity, booking => booking.guestInfo)
  booking: BookingEntity;

}