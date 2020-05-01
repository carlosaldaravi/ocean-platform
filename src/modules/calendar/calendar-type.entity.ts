import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Calendar } from './calendar.entity';

@Entity('calendar_types')
export class CalendarType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @OneToMany(
    type => Calendar,
    calendar => calendar.type,
  )
  calendar: Calendar;
}
