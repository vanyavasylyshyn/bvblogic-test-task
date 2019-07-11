import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { HouseEntity } from './houseInfo.entity';
import { GuestInfoEntity } from './guestInfo.entity';
import { PeriodsEntity } from './periods.entity';

@Entity('booking')
export class BookingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => HouseEntity, house => house.booking)
  house: HouseEntity;

  @ManyToOne(type => PeriodsEntity, periods => periods.booking,{
    cascade: true
  })
  period: PeriodsEntity;

  @Column({default: true})
  status: boolean;

  @Column({type: "date"})
  startingDate: Date;

  @Column({type: "date"})
  finishingDate: Date;

  @Column()
  guestChecked: boolean;

  @ManyToOne(type => GuestInfoEntity, guestInfo => guestInfo.booking, {
    cascade: true
  })
  guestInfo: GuestInfoEntity;

}
