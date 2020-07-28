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
import { ReadLevelDto, CreateLevelDto, UpdateLevelDto } from './dto';
import { LevelService } from './level.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../role/guards/role.guard';
import { RoleType } from '../role/roletype.enum';
import { Roles } from '../role/decorators/role.decoratos';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('levels')
@ApiTags('Levels')
export class LevelController {
  constructor(private readonly _levelService: LevelService) {}

  @Get(':levelId')
  getLevel(
    @Param('levelId', ParseIntPipe) levelId: number,
  ): Promise<ReadLevelDto> {
    return this._levelService.get(levelId);
  }

  @Get()
  async getLevels(): Promise<ReadLevelDto[]> {
    return this._levelService.getAll();
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(RoleType.ADMIN)
  createLevel(@Body() level: Partial<CreateLevelDto>): Promise<ReadLevelDto> {
    return this._levelService.create(level);
  }

  @Patch(':levelId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(RoleType.ADMIN)
  updateLevel(
    @Param('levelId', ParseIntPipe) levelId: number,
    @Body() level: Partial<UpdateLevelDto>,
  ): Promise<ReadLevelDto> {
    return this._levelService.update(levelId, level);
  }

  @Delete(':levelId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(RoleType.ADMIN)
  deleteLevel(@Param('levelId', ParseIntPipe) levelId: number): Promise<void> {
    return this._levelService.delete(levelId);
  }
}
