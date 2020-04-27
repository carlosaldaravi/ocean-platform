import { Repository, EntityRepository } from 'typeorm';
import { Target } from './target.entity';

@EntityRepository(Target)
export class TargetRepository extends Repository<Target> {}
