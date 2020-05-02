import { Repository, EntityRepository } from 'typeorm';
import { Level } from './level.entity';

@EntityRepository(Level)
export class LevelRepository extends Repository<Level> {}
