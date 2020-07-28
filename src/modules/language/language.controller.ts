import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ReadLanguageDto, CreateLanguageDto, UpdateLanguageDto } from './dto';
import { LanguageService } from './language.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../role/guards/role.guard';
import { RoleType } from '../role/roletype.enum';
import { Roles } from '../role/decorators/role.decoratos';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('languages')
@ApiTags('Languages')
export class LanguageController {
  constructor(private readonly _languageService: LanguageService) {}

  @Get(':languageId')
  getLanguage(
    @Param('languageId', ParseIntPipe) languageId: number,
  ): Promise<ReadLanguageDto> {
    return this._languageService.get(languageId);
  }

  @Get()
  async getLanguages(): Promise<ReadLanguageDto[]> {
    return this._languageService.getAll();
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(RoleType.ADMIN)
  createLanguage(
    @Body() language: Partial<CreateLanguageDto>,
  ): Promise<ReadLanguageDto> {
    return this._languageService.create(language);
  }

  @Patch(':languageId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(RoleType.ADMIN)
  updateLanguage(
    @Param('languageId', ParseIntPipe) languageId: number,
    @Body() language: Partial<UpdateLanguageDto>,
  ): Promise<ReadLanguageDto> {
    return this._languageService.update(languageId, language);
  }

  @Delete(':languageId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(RoleType.ADMIN)
  deleteLanguage(
    @Param('languageId', ParseIntPipe) languageId: number,
  ): Promise<void> {
    return this._languageService.delete(languageId);
  }
}
