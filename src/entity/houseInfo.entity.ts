import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BookingEntity } from './booking.entity';
import { BlockedEntity } from './blocked.entity';

@Entity('houseInfo')
export class HouseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, length: 50 })
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({default: null})
  minDuration: number;

  @Column({default: null})
  srcImage: string;

  @Column({default: null})
  adress: string;

  @Column({ default: null })
  dailyPrice: number;

  @Column({ default: null })
  weekendPrice: number;

  @Column({ default: null })
  discount: number;

  @OneToMany(type => BookingEntity, booking => booking.house)
  booking: BookingEntity;

  @OneToMany(type => BlockedEntity, blocked => blocked.house)
  blocked: BlockedEntity;
}
