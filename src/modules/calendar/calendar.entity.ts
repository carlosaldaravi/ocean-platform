import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { User } from '../user/user.entity';
import { CalendarType } from './calendar-type.entity';

@Entity()
export class Calendar extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: false })
  date: Date;

  @Column('time', { nullable: true })
  start_time: Date;

  @Column('time', { nullable: true })
  end_time: Date;

  @Column({ nullable: true })
  comments: string;

  @ManyToOne(
    type => User,
    user => user.date,
  )
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(
    type => CalendarType,
    type => type.calendar,
  )
  @JoinColumn({ name: 'type_id' })
  type: Calendar;
}
