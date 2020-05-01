import {
  Injectable,
  BadRequestException,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SportRepository } from './sport.reposity';
import { status } from '../../shared/entity-status.enum';
import { ReadSportDto, CreateSportDto, UpdateSportDto } from './dto';
import { plainToClass } from 'class-transformer';
import { Sport } from './sport.entity';
import { In } from 'typeorm';

@Injectable()
export class SportService {
  constructor(
    @InjectRepository(SportRepository)
    private readonly _sportRepository: SportRepository,
  ) {}

  async get(sportId: number): Promise<ReadSportDto> {
    if (!sportId) {
      throw new BadRequestException('sportId must be sent');
    }
    const sport: Sport = await this._sportRepository.findOne(sportId, {
      where: { status: status.ACTIVE },
    });
    if (!sport) {
      throw new HttpException('This sport does not exists', HttpStatus.OK);
    }
    return plainToClass(ReadSportDto, sport);
  }

  async getAll(): Promise<ReadSportDto[]> {
    const sports: Sport[] = await this._sportRepository.find({
      where: { status: status.ACTIVE },
    });

    if (!sports) {
      throw new NotFoundException();
    }

    return sports.map((sport: Sport) => plainToClass(ReadSportDto, sport));
  }

  async getSportByStudent(studentId: number): Promise<ReadSportDto[]> {
    if (!studentId) {
      throw new BadRequestException('Student id must be sent');
    }

    const sports: Sport[] = await this._sportRepository.find({
      where: { status: status.ACTIVE, students: In[studentId] },
    });

    return sports.map(sport => plainToClass(ReadSportDto, sport));
  }

  async create(sport: Partial<CreateSportDto>): Promise<ReadSportDto> {
    const foundSport: Sport = await this._sportRepository.findOne({
      where: { name: sport.name },
    });

    if (foundSport) {
      if (foundSport.status === status.INACTIVE) {
        foundSport.status = status.ACTIVE;
        await foundSport.save();
        return plainToClass(ReadSportDto, foundSport);
      } else {
        throw new HttpException('This sport already exists', HttpStatus.OK);
      }
    } else {
      const savedSport: Sport = await this._sportRepository.save({
        name: sport.name,
        description: sport.description,
      });
      return plainToClass(ReadSportDto, savedSport);
    }
  }

  async update(
    sportId: number,
    sport: Partial<UpdateSportDto>,
  ): Promise<ReadSportDto> {
    const foundSport = await this._sportRepository.findOne(sportId, {
      where: { status: status.ACTIVE },
    });

    if (!foundSport) {
      throw new HttpException('This sport does not exists', HttpStatus.OK);
    }

    foundSport.name = sport.name;
    foundSport.description = sport.description;

    await foundSport.save();

    return plainToClass(ReadSportDto, foundSport);
  }

  async delete(sportId: number): Promise<ReadSportDto> {
    const sportExist = await this._sportRepository.findOne(sportId, {
      where: { status: status.ACTIVE },
    });

    if (!sportExist) {
      throw new HttpException('This sport does not exists', HttpStatus.OK);
    }

    const updatedSport = await this._sportRepository.update(sportId, {
      status: status.INACTIVE,
    });

    return plainToClass(ReadSportDto, updatedSport);
  }
}
