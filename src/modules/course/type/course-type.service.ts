import {
  Injectable,
  BadRequestException,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseTypeRepository } from './course-type.repository';
import {
  ReadCourseTypeDto,
  CreateCourseTypeDto,
  UpdateCourseTypeDto,
} from './dto';
import { plainToClass } from 'class-transformer';
import { CourseType } from '../course-type.entity';

@Injectable()
export class CourseTypeService {
  constructor(
    @InjectRepository(CourseTypeRepository)
    private readonly _courseTypeRepository: CourseTypeRepository,
  ) {}

  async get(courseTypeId: number): Promise<ReadCourseTypeDto> {
    if (!courseTypeId) {
      throw new BadRequestException('courseTypeId must be sent');
    }
    const courseType: CourseType = await this._courseTypeRepository.findOne(
      courseTypeId,
    );
    if (!courseType) {
      throw new HttpException(
        'This course type does not exists',
        HttpStatus.OK,
      );
    }
    return plainToClass(ReadCourseTypeDto, courseType);
  }

  async getAll(): Promise<ReadCourseTypeDto[]> {
    const courseTypes: CourseType[] = await this._courseTypeRepository.find();

    if (!courseTypes) {
      throw new NotFoundException();
    }

    return courseTypes.map((courseType: CourseType) =>
      plainToClass(ReadCourseTypeDto, courseType),
    );
  }

  async create(
    courseType: Partial<CreateCourseTypeDto>,
  ): Promise<ReadCourseTypeDto> {
    const savedCourseType: CourseType = await this._courseTypeRepository.save(
      courseType,
    );
    return plainToClass(ReadCourseTypeDto, savedCourseType);
  }

  async update(
    courseTypeId: number,
    courseType: Partial<UpdateCourseTypeDto>,
  ): Promise<ReadCourseTypeDto> {
    const foundCourseType = await this._courseTypeRepository.findOne(
      courseTypeId,
    );

    if (!foundCourseType) {
      throw new HttpException(
        'This course type does not exists',
        HttpStatus.OK,
      );
    }

    foundCourseType.name = courseType.name;

    await foundCourseType.save();

    return plainToClass(ReadCourseTypeDto, foundCourseType);
  }

  async delete(courseTypeId: number): Promise<ReadCourseTypeDto> {
    const updatedCourseType = await this._courseTypeRepository.delete(
      courseTypeId,
    );

    return plainToClass(ReadCourseTypeDto, updatedCourseType);
  }
}
