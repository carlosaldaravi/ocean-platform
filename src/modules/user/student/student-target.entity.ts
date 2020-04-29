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
  @Column({ name: 'student_id', primary: true })
  studentId!: number;

  @Column({ name: 'target_id', primary: true })
  targetId!: number;

  @Column({ name: 'validated_by' })
  validatedBy: number;

  @CreateDateColumn({ type: 'date' })
  date: Date;

  @Column({ nullable: true })
  feedback: string;

  @ManyToOne(
    type => User,
    user => user.studentTarget,
  )
  @JoinColumn({ name: 'student_id' })
  student!: User;

  @ManyToOne(
    type => Target,
    target => target.studentTarget,
  )
  @JoinColumn({ name: 'target_id' })
  target!: Target;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'validated_by' })
  instructor!: User;
}
