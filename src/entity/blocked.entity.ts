import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { HouseEntity } from './houseInfo.entity';
import { PeriodsEntity } from './periods.entity';


@Entity('blocked')
export class BlockedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => HouseEntity, house => house.booking)
  house: HouseEntity;

  @ManyToOne(type => PeriodsEntity, periods => periods.blocked,{
    cascade: true
  })
  period: PeriodsEntity;



}