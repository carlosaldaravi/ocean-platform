import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { Calendar } from './calendar.entity';

@Entity('calendar_types')
export class CalendarType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToOne(
    type => Calendar,
    calendar => calendar.type,
  )
  calendar: Calendar;
}
