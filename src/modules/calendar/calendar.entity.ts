import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  DeleteDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { CalendarType } from './calendar-type.entity';

@Entity('user_calendar')
export class Calendar extends BaseEntity {
  @PrimaryColumn({ name: 'user_id' })
  userId: number;

  @PrimaryColumn({ type: 'date' })
  date: Date;

  @Column({ name: 'type_id', nullable: false, unique: false })
  typeId: number;

  @Column('time', { nullable: true })
  start_time: Date;

  @Column('time', { nullable: true })
  end_time: Date;

  @Column({ nullable: true })
  comments: string;

  @ManyToOne(
    type => User,
    user => user.date,
    { primary: true },
  )
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(
    type => CalendarType,
    type => type.calendar,
    { eager: true },
  )
  @JoinColumn({ name: 'type_id' })
  type: CalendarType;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;
}
