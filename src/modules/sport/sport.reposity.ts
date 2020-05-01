import { Repository, EntityRepository } from 'typeorm';
import { Sport } from './sport.entity';

@EntityRepository(Sport)
export class SportRepository extends Repository<Sport> {}
