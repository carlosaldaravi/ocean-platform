import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  DeleteDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { CalendarType } from './calendar-type.entity';

@Entity('user_calendar')
export class UserCalendar extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'user_id', unique: false })
  userId: number;

  @Column({ name: 'type_id', unique: false })
  typeId: number;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @Column()
  allDay: boolean;

  @Column({ nullable: true })
  comments: string;

  @ManyToOne(
    type => User,
    user => user.calendar,
    { primary: true },
  )
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(
    type => CalendarType,
    type => type.calendar,
    { eager: true },
  )
  @JoinColumn({ name: 'type_id' })
  type: CalendarType;
}
