import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  Entity,
  JoinColumn,
  ManyToOne,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Level } from '../level/level.entity';
import { Sport } from '../sport/sport.entity';
import { StudentTarget } from '../user/student/student-target.entity';

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

  @OneToMany(
    type => StudentTarget,
    studentTarget => studentTarget.target,
  )
  @JoinTable({
    name: 'student_targets',
  })
  studentTargets!: StudentTarget[];

  @ManyToOne(
    type => Level,
    level => level.targets,
    { eager: true },
  )
  @JoinColumn({ name: 'level_id' })
  level: Level;

  @ManyToOne(
    type => Sport,
    sport => sport.target,
  )
  @JoinColumn({ name: 'sport_id' })
  sport: Sport;
}
