import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';


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

  

}