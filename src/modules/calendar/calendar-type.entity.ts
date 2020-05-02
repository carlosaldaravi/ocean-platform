import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { UserCalendar } from './user-calendar.entity';

@Entity('calendar_types')
export class CalendarType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @OneToMany(
    type => UserCalendar,
    calendar => calendar.type,
  )
  calendar: UserCalendar;
}
