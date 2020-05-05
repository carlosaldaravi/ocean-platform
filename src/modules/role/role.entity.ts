import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { status } from '../../shared/entity-status.enum';

@Entity('roles')
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', default: status.ACTIVE, length: 8 })
  status: string;
}
