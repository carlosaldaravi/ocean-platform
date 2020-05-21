import {
  Entity,
  Column,
  ManyToOne,
  BaseEntity,
  JoinColumn,
  PrimaryColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../user.entity';
import { Target } from 'src/modules/target/target.entity';

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

  @ManyToOne(
    type => User,
    student => student.studentTargets,
  )
  @JoinColumn({ name: 'student_id' })
  student!: User;

  @ManyToOne(
    type => Target,
    target => target.studentTargets,
  )
  @JoinColumn({ name: 'target_id' })
  target!: Target;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'validated_by' })
  instructor!: User;
}
