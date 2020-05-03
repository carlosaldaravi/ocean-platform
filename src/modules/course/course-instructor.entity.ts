import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';

@Entity('course_instructors')
export class CourseInstructor extends BaseEntity {
  @PrimaryColumn({
    name: 'instructor_id',
    primary: true,
    unique: false,
  })
  instructorId!: number;

  @PrimaryColumn({
    name: 'course_id',
    primary: true,
    unique: false,
  })
  courseId!: number;

  @Column({ default: false })
  cashed: boolean;

  @CreateDateColumn({ type: 'date', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'date', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'date', name: 'deleted_at' })
  deletedAt: Date;
}
