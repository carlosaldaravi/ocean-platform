import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('courses')
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
