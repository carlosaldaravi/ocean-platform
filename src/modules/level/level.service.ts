import {
  Injectable,
  BadRequestException,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LevelRepository } from './level.reposity';
import { status } from '../../shared/entity-status.enum';
import { ReadLevelDto, CreateLevelDto, UpdateLevelDto } from './dto';
import { plainToClass } from 'class-transformer';
import { Level } from './level.entity';
import { In } from 'typeorm';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(LevelRepository)
    private readonly _levelRepository: LevelRepository,
  ) {}

  async get(levelId: number): Promise<ReadLevelDto> {
    if (!levelId) {
      throw new BadRequestException('levelId must be sent');
    }
    const level: Level = await this._levelRepository.findOne(levelId, {
      where: { status: status.ACTIVE },
    });
    if (!level) {
      throw new HttpException('This level does not exists', HttpStatus.OK);
    }
    return plainToClass(ReadLevelDto, level);
  }

  async getAll(): Promise<ReadLevelDto[]> {
    const levels: Level[] = await this._levelRepository.find({
      where: { status: status.ACTIVE },
    });

    if (!levels) {
      throw new NotFoundException();
    }

    return levels.map((level: Level) => plainToClass(ReadLevelDto, level));
  }

  async getLevelByStudent(studentId: number): Promise<ReadLevelDto[]> {
    if (!studentId) {
      throw new BadRequestException('Student id must be sent');
    }

    const levels: Level[] = await this._levelRepository.find({
      where: { status: status.ACTIVE, students: In[studentId] },
    });

    return levels.map(level => plainToClass(ReadLevelDto, level));
  }

  async create(level: Partial<CreateLevelDto>): Promise<ReadLevelDto> {
    const foundLevel: Level = await this._levelRepository.findOne({
      where: { name: level.name },
    });

    if (foundLevel) {
      if (foundLevel.status === status.INACTIVE) {
        foundLevel.status = status.ACTIVE;
        await foundLevel.save();
        return plainToClass(ReadLevelDto, foundLevel);
      } else {
        throw new HttpException('This level already exists', HttpStatus.OK);
      }
    } else {
      const savedLevel: Level = await this._levelRepository.save({
        name: level.name,
      });
      return plainToClass(ReadLevelDto, savedLevel);
    }
  }

  async update(
    levelId: number,
    level: Partial<UpdateLevelDto>,
  ): Promise<ReadLevelDto> {
    const foundLevel = await this._levelRepository.findOne(levelId, {
      where: { status: status.ACTIVE },
    });

    if (!foundLevel) {
      throw new HttpException('This level does not exists', HttpStatus.OK);
    }

    foundLevel.name = level.name;

    await foundLevel.save();

    return plainToClass(ReadLevelDto, foundLevel);
  }

  async delete(levelId: number): Promise<ReadLevelDto> {
    const levelExist = await this._levelRepository.findOne(levelId, {
      where: { status: status.ACTIVE },
    });

    if (!levelExist) {
      throw new HttpException('This level does not exists', HttpStatus.OK);
    }

    const updatedLevel = await this._levelRepository.update(levelId, {
      status: status.INACTIVE,
    });

    return plainToClass(ReadLevelDto, updatedLevel);
  }
}
