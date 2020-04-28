import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Calendar extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp', { unique: true })
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
}
