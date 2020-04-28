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
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'student_id' })
  studentId!: number;

  @Column({ name: 'target_id' })
  targetId!: number;

  @Column({ name: 'validated_by' })
  validatedBy: number;

  @CreateDateColumn()
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
