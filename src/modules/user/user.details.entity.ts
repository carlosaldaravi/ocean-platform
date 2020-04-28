import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user_details')
export class UserDetails extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: true })
  firstname: string;

  @Column({ type: 'varchar', nullable: true })
  lastname: string;

  @Column({ type: 'varchar', length: 9, nullable: true })
  phone: string;

  @Column({ type: 'varchar', nullable: true, length: 50 })
  city: string;

  @Column({ type: 'varchar', nullable: true, length: 50, name: 'known_way' })
  knownWay: string;

  @Column({ type: 'varchar', nullable: true, length: 50 })
  size: string;

  @Column({ type: 'int', nullable: true })
  weight: number;

  @Column({ type: 'int', nullable: true })
  footprint: number;

  @Column({ type: 'date', nullable: true, name: 'date_born' })
  dateBorn: Date;

  @Column({ type: 'varchar', nullable: true })
  comments: string;

  @Column({ type: 'varchar', nullable: true, length: 6 })
  gender: string;
}
