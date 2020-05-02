import {
  Injectable,
  BadRequestException,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LanguageRepository } from './language.reposity';
import { status } from '../../shared/entity-status.enum';
import { ReadLanguageDto, CreateLanguageDto, UpdateLanguageDto } from './dto';
import { plainToClass } from 'class-transformer';
import { Language } from './language.entity';
import { In } from 'typeorm';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(LanguageRepository)
    private readonly _languageRepository: LanguageRepository,
  ) {}

  async get(languageId: number): Promise<ReadLanguageDto> {
    if (!languageId) {
      throw new BadRequestException('languageId must be sent');
    }
    const language: Language = await this._languageRepository.findOne(
      languageId,
      {
        where: { status: status.ACTIVE },
      },
    );
    if (!language) {
      throw new HttpException('This language does not exists', HttpStatus.OK);
    }
    return plainToClass(ReadLanguageDto, language);
  }

  async getAll(): Promise<ReadLanguageDto[]> {
    const languages: Language[] = await this._languageRepository.find({
      where: { status: status.ACTIVE },
    });

    if (!languages) {
      throw new NotFoundException();
    }

    return languages.map((language: Language) =>
      plainToClass(ReadLanguageDto, language),
    );
  }

  async getLanguageByStudent(studentId: number): Promise<ReadLanguageDto[]> {
    if (!studentId) {
      throw new BadRequestException('Student id must be sent');
    }

    const languages: Language[] = await this._languageRepository.find({
      where: { status: status.ACTIVE, students: In[studentId] },
    });

    return languages.map(language => plainToClass(ReadLanguageDto, language));
  }

  async create(language: Partial<CreateLanguageDto>): Promise<ReadLanguageDto> {
    const foundLanguage: Language = await this._languageRepository.findOne({
      where: { name: language.name },
    });

    if (foundLanguage) {
      if (foundLanguage.status === status.INACTIVE) {
        foundLanguage.status = status.ACTIVE;
        await foundLanguage.save();
        return plainToClass(ReadLanguageDto, foundLanguage);
      } else {
        throw new HttpException('This language already exists', HttpStatus.OK);
      }
    } else {
      const savedLanguage: Language = await this._languageRepository.save({
        name: language.name,
      });
      return plainToClass(ReadLanguageDto, savedLanguage);
    }
  }

  async update(
    languageId: number,
    language: Partial<UpdateLanguageDto>,
  ): Promise<ReadLanguageDto> {
    const foundLanguage = await this._languageRepository.findOne(languageId, {
      where: { status: status.ACTIVE },
    });

    if (!foundLanguage) {
      throw new HttpException('This language does not exists', HttpStatus.OK);
    }

    foundLanguage.name = language.name;

    await foundLanguage.save();

    return plainToClass(ReadLanguageDto, foundLanguage);
  }

  async delete(languageId: number): Promise<ReadLanguageDto> {
    const languageExist = await this._languageRepository.findOne(languageId, {
      where: { status: status.ACTIVE },
    });

    if (!languageExist) {
      throw new HttpException('This language does not exists', HttpStatus.OK);
    }

    const updatedLanguage = await this._languageRepository.update(languageId, {
      status: status.INACTIVE,
    });

    return plainToClass(ReadLanguageDto, updatedLanguage);
  }
}
