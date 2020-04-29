import { Repository, EntityRepository } from 'typeorm';
import { StudentTarget } from './student-target.entity';

@EntityRepository(StudentTarget)
export class StudentTargetRepository extends Repository<StudentTarget> {}
