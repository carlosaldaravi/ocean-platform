import {
  Entity,
  Column,
  ManyToOne,
  BaseEntity,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { Sport } from './sport.entity';
import { Level } from '../level/level.entity';

@Entity('sport_levels')
export class SportLevel extends BaseEntity {
  @PrimaryColumn({
    name: 'sport_id',
    primary: true,
    unique: false,
  })
  sportId!: number;

  @PrimaryColumn({
    name: 'level_id',
    primary: true,
    unique: false,
  })
  levelId!: number;

  @Column()
  order: number;

  @ManyToOne(
    type => Sport,
    sport => sport.sportLevels,
  )
  @JoinColumn({ name: 'sport_id' })
  sport!: Sport;

  @ManyToOne(
    type => Level,
    level => level.sportLevel,
    { eager: true },
  )
  @JoinColumn({ name: 'level_id' })
  level!: Level;
}
