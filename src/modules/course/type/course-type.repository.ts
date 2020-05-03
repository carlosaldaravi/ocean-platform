import { Repository, EntityRepository } from 'typeorm';
import { CourseType } from '../course-type.entity';

@EntityRepository(CourseType)
export class CourseTypeRepository extends Repository<CourseType> {}
