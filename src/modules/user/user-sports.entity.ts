import {
  Entity,
  Column,
  ManyToOne,
  BaseEntity,
  JoinColumn,
  PrimaryColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Sport } from '../../modules/sport/sport.entity';
import { Level } from '../level/level.entity';

@Entity('user_sports')
export class UserSport extends BaseEntity {
  @PrimaryColumn({
    name: 'user_id',
    primary: true,
    unique: false,
  })
  userId!: number;

  @PrimaryColumn({
    name: 'sport_id',
    primary: true,
    unique: false,
  })
  sportId!: number;

  @Column({
    name: 'level_id',
    unique: false,
  })
  levelId!: number;

  @ManyToOne(
    type => User,
    user => user.userSports,
  )
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(
    type => Sport,
    sport => sport.userSport,
  )
  @JoinColumn({ name: 'sport_id' })
  sport!: Sport;

  @ManyToOne(type => Level)
  @JoinColumn({ name: 'level_id' })
  level!: Level;
}
