import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('course_students')
export class CourseStudent extends BaseEntity {
  @PrimaryColumn({
    name: 'student_id',
    primary: true,
    unique: false,
  })
  studentId!: number;

  @PrimaryColumn({
    name: 'course_id',
    primary: true,
    unique: false,
  })
  courseId!: number;

  @CreateDateColumn({ type: 'date', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'date', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'date', name: 'deleted_at' })
  deletedAt: Date;
}
