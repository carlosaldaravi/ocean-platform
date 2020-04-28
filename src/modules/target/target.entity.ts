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
} from 'typeorm';
import { User } from '../user/user.entity';
import { status } from '../../shared/entity-status.enum';
import { StudentTarget } from '../user/student/student-target.entity';

@Entity('targets')
export class Target extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  level: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @OneToMany(
    type => StudentTarget,
    studentTarget => studentTarget.student,
  )
  studentTarget!: StudentTarget[];

  @Column({ type: 'varchar', default: status.ACTIVE, length: 8 })
  status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
