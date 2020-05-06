import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Level } from '../level/level.entity';
import { User } from '../user/user.entity';
import { Sport } from '../sport/sport.entity';

@Entity('targets')
export class Target extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ name: 'level_id' })
  levelId: number;

  @Column({ name: 'sport_id' })
  sportId: number;

  @ManyToMany(
    type => User,
    user => user.targets,
  )
  students!: User[];

  @ManyToOne(
    type => Level,
    level => level.target,
    { eager: true },
  )
  @JoinColumn({ name: 'level_id' })
  level: Level;

  @ManyToOne(
    type => Sport,
    sport => sport.target,
  )
  @JoinColumn({ name: 'sport_id' })
  sport: Level;
}
