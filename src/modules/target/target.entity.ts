import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { status } from '../../shared/entity-status.enum';
// import { StudentTarget } from '../user/student/student-target.entity';
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

  @ManyToMany(type => User)
  students!: User[];

  @Column({ type: 'varchar', default: status.ACTIVE, length: 8 })
  status: string;

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
