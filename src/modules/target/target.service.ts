import {
  Injectable,
  BadRequestException,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TargetRepository } from './target.reposity';
import { ReadTargetDto, CreateTargetDto, UpdateTargetDto } from './dto';
import { plainToClass } from 'class-transformer';
import { Target } from './target.entity';
import { In } from 'typeorm';
import { Level } from '../level/level.entity';

@Injectable()
export class TargetService {
  constructor(
    @InjectRepository(TargetRepository)
    private readonly _targetRepository: TargetRepository,
  ) {}

  async get(targetId: number): Promise<ReadTargetDto> {
    if (!targetId) {
      throw new BadRequestException('targetId must be sent');
    }
    const target: Target = await this._targetRepository.findOne(targetId);
    if (!target) {
      throw new HttpException('This target does not exists', HttpStatus.OK);
    }
    return plainToClass(ReadTargetDto, target);
  }

  async getAll(): Promise<ReadTargetDto[]> {
    // const targets: Target[] = await this._targetRepository.find();
    const targets: Target[] = await this._targetRepository
      .createQueryBuilder('target')
      .innerJoinAndSelect('target.level', 'level')
      .innerJoinAndSelect('target.sport', 'sport')
      .getMany();
    if (!targets) {
      throw new NotFoundException();
    }

    return targets.map((target: Target) => plainToClass(ReadTargetDto, target));
  }

  async getTargetByStudent(studentId: number): Promise<ReadTargetDto[]> {
    if (!studentId) {
      throw new BadRequestException('Student id must be sent');
    }

    const targets: Target[] = await this._targetRepository.find({
      where: { students: In[studentId] },
    });

    return targets.map(target => plainToClass(ReadTargetDto, target));
  }

  async getTargetBySport(sportId: number): Promise<ReadTargetDto[]> {
    if (!sportId) {
      throw new BadRequestException('Sport id must be sent');
    }

    const targets: Target[] = await this._targetRepository.find({
      where: { sportId },
    });

    return targets.map(target => plainToClass(ReadTargetDto, target));
  }

  async create(target: Partial<CreateTargetDto>): Promise<ReadTargetDto> {
    const savedTarget: Target = await this._targetRepository.save({
      name: target.name,
      levelId: target.levelId,
      sportId: target.sportId,
      description: target.description,
    });

    console.log('id: ', savedTarget);

    const foundTarget: Target = await this._targetRepository
      .createQueryBuilder('target')
      .innerJoinAndSelect('target.level', 'level')
      .innerJoinAndSelect('target.sport', 'sport')
      .where('target.id = :id')
      .setParameter('id', savedTarget.id)
      .getOne();

    return plainToClass(ReadTargetDto, foundTarget);
  }

  async update(
    targetId: number,
    target: Partial<UpdateTargetDto>,
  ): Promise<ReadTargetDto> {
    const foundTarget = await this._targetRepository.findOne(targetId);

    if (!foundTarget) {
      throw new HttpException('This target does not exists', HttpStatus.OK);
    }

    foundTarget.name = target.name;
    foundTarget.description = target.description;

    await foundTarget.save();

    return plainToClass(ReadTargetDto, foundTarget);
  }

  async delete(targetId: number): Promise<void> {
    await this._targetRepository.delete(targetId);
  }
}
