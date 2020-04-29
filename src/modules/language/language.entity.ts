import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { status } from '../../shared/entity-status.enum';

@Entity('languages')
export class Language extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', default: status.ACTIVE, length: 8 })
  status: string;

  @ManyToOne(
    type => User,
    user => user.languages,
  )
  users: User[];
}
