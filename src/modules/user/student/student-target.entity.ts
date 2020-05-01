import {
  Entity,
  Column,
  ManyToOne,
  BaseEntity,
  JoinColumn,
  PrimaryColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Target } from '../../target/target.entity';
import { User } from '../user.entity';

@Entity('student_targets')
export class StudentTarget extends BaseEntity {
  @PrimaryColumn({
    name: 'student_id',
    primary: true,
    unique: false,
  })
  studentId!: number;

  @PrimaryColumn({
    name: 'target_id',
    primary: true,
    unique: false,
  })
  targetId!: number;

  @Column({ name: 'validated_by', nullable: true })
  validatedBy: number;

  @CreateDateColumn({ type: 'date' })
  date: Date;

  @Column({ nullable: true })
  feedback: string;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'validated_by' })
  instructor!: User;
}
