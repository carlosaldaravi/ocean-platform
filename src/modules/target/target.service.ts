import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TargetRepository } from './target.reposity';
import { status } from '../../shared/entity-status.enum';
import { ReadTargetDto, CreateTargetDto, UpdateTargetDto } from './dto';
import { plainToClass } from 'class-transformer';
import { Target } from './target.entity';
import { In } from 'typeorm';

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
    const target: Target = await this._targetRepository.findOne(targetId, {
      where: { status: status.ACTIVE },
    });
    if (!target) {
      throw new NotFoundException('Target does not exist');
    }
    return plainToClass(ReadTargetDto, target);
  }

  async getAll(): Promise<ReadTargetDto[]> {
    const targets: Target[] = await this._targetRepository.find({
      where: { status: status.ACTIVE },
    });

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
      where: { status: status.ACTIVE, students: In[studentId] },
    });

    return targets.map(target => plainToClass(ReadTargetDto, target));
  }

  async create(target: Partial<CreateTargetDto>): Promise<ReadTargetDto> {
    const savedTarget: Target = await this._targetRepository.save({
      name: target.name,
      level: target.level,
      description: target.description,
    });
    return plainToClass(ReadTargetDto, savedTarget);
  }

  async update(
    targetId: number,
    target: Partial<UpdateTargetDto>,
  ): Promise<ReadTargetDto> {
    const foundTarget = await this._targetRepository.findOne(targetId, {
      where: { status: status.ACTIVE },
    });

    if (!foundTarget) {
      throw new NotFoundException('Target does not exists');
    }

    foundTarget.name = target.name;
    foundTarget.level = target.level;
    foundTarget.description = target.description;

    const updatedTarget = await this._targetRepository.findOne(foundTarget);

    return plainToClass(ReadTargetDto, updatedTarget);
  }

  async delete(targetId: number): Promise<void> {
    const userExist = await this._targetRepository.findOne(targetId, {
      where: { status: status.ACTIVE },
    });

    if (!userExist) {
      throw new NotFoundException();
    }

    await this._targetRepository.update(targetId, { status: status.INACTIVE });
  }
}
