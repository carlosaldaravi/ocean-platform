import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinTable,
  ManyToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { UserDetails } from './user.details.entity';
import { Role } from '../role/role.entity';
import { status } from '../../shared/entity-status.enum';
import { UserCalendar } from '../calendar/user-calendar.entity';
import { Language } from '../language/language.entity';
import { StudentTarget } from './student/student-target.entity';
import { Course } from '../course/course.entity';
import { Level } from '../level/level.entity';
import { Exclude } from 'class-transformer';
import { UserSport } from './user-sports.entity';
import { CourseStudent } from '../course/course-student.entity';
import { CourseInstructor } from '../course/course-instructor.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @OneToOne(type => UserDetails, { cascade: true, eager: true })
  @JoinColumn({ name: 'detail_id' })
  details: UserDetails;

  @ManyToMany(
    type => Role,
    role => role.users,
    { eager: true },
  )
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];

  @ManyToMany(type => Language, { onUpdate: 'CASCADE' })
  @JoinTable({
    name: 'user_languages',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'language_id', referencedColumnName: 'id' },
  })
  languages: Language[];

  @OneToMany(
    type => StudentTarget,
    studentTarget => studentTarget.student,
  )
  @JoinTable({
    name: 'student_targets',
  })
  studentTargets!: StudentTarget[];

  @OneToMany(
    type => CourseStudent,
    courseStudent => courseStudent.student,
  )
  @JoinTable({
    name: 'course_students',
  })
  courseStudents!: CourseStudent[];

  @OneToMany(
    type => CourseInstructor,
    courseInstructor => courseInstructor.instructor,
  )
  @JoinTable({
    name: 'course_instructors',
  })
  courseInstructors!: CourseInstructor[];

  @OneToMany(
    type => UserSport,
    userSport => userSport.user,
    { onUpdate: 'CASCADE' },
  )
  @JoinTable({
    name: 'user_sports',
  })
  userSports!: UserSport[];

  @OneToMany(
    type => StudentTarget,
    studentTarget => studentTarget.validatedBy,
  )
  studentTargetValidations: StudentTarget[];

  @OneToMany(
    type => UserCalendar,
    calendar => calendar.user,
  )
  calendar: UserCalendar[];

  @Column({ type: 'varchar', default: status.ACTIVE, length: 8 })
  status: status;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
