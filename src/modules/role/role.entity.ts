import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { status } from '../../shared/entity-status.enum';

@Entity('roles')
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
  name: string;

  @ManyToMany(
    type => User,
    user => user.roles,
  )
  @JoinColumn()
  users: User[];

  @Column({ type: 'varchar', default: status.ACTIVE, length: 8 })
  status: string;
}
