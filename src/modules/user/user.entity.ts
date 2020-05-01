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
} from 'typeorm';
import { UserDetails } from './user.details.entity';
import { Role } from '../role/role.entity';
import { status } from '../../shared/entity-status.enum';
// import { StudentTarget } from './student/student-target.entity';
import { Calendar } from '../calendar/calendar.entity';
import { Language } from '../language/language.entity';
import { Target } from '../target/target.entity';
import { StudentTarget } from './student/student-target.entity';
// import { StudentTarget } from './student/student-target.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', unique: true })
  email: string;

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
  @JoinTable({ name: 'user_roles' })
  roles: Role[];

  @ManyToMany(
    type => Language,
    language => language.users,
    { eager: true },
  )
  @JoinTable({ name: 'user_languages' })
  languages: Language[];

  @ManyToMany(type => Target, { eager: true })
  @JoinTable({
    name: 'student_targets',
    joinColumn: { name: 'student_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'target_id', referencedColumnName: 'id' },
  })
  targets!: Target[];

  @OneToMany(
    type => StudentTarget,
    studentTarget => studentTarget.validatedBy,
  )
  studentTargetValidations: StudentTarget[];

  @OneToMany(
    type => Calendar,
    calendar => calendar.user,
    { eager: true },
  )
  date: Calendar[];

  @Column({ type: 'varchar', default: status.ACTIVE, length: 8 })
  status: status;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
