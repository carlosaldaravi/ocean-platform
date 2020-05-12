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
import { Target } from '../target/target.entity';
import { StudentTarget } from './student/student-target.entity';
import { Course } from '../course/course.entity';
import { Sport } from '../sport/sport.entity';
import { Level } from '../level/level.entity';
import { Exclude } from 'class-transformer';

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

  @ManyToMany(type => Language)
  @JoinTable({
    name: 'user_languages',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'language_id', referencedColumnName: 'id' },
  })
  languages: Language[];

  @ManyToMany(
    type => Target,
    target => target.students,
  )
  @JoinTable({
    name: 'student_targets',
    joinColumn: { name: 'student_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'target_id', referencedColumnName: 'id' },
  })
  targets!: Target[];

  @ManyToMany(
    type => Course,
    course => course.students,
  )
  @JoinTable({
    name: 'course_students',
    joinColumn: { name: 'student_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'course_id', referencedColumnName: 'id' },
  })
  studentCourses!: Course[];

  @ManyToMany(
    type => Course,
    course => course.instructors,
  )
  @JoinTable({
    name: 'course_instructors',
    joinColumn: { name: 'instructor_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'course_id', referencedColumnName: 'id' },
  })
  instructorCourses!: Course[];

  @ManyToMany(type => Sport)
  @JoinTable({
    name: 'user_sports',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'sport_id', referencedColumnName: 'id' },
  })
  sports!: Sport[];

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

  @ManyToOne(
    type => Level,
    level => level.users,
    { cascade: true },
  )
  @JoinColumn({ name: 'level_id' })
  level: Level;

  @Column({ type: 'varchar', default: status.ACTIVE, length: 8 })
  status: status;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
