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
import { ReadSportDto, CreateSportDto, UpdateSportDto } from './dto';
import { SportService } from './sport.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../role/guards/role.guard';
import { RoleType } from '../role/roletype.enum';
import { Roles } from '../role/decorators/role.decoratos';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('sports')
@UseGuards(AuthGuard('jwt'), RoleGuard)
export class SportController {
  constructor(private readonly _sportService: SportService) {}

  @Get(':sportId')
  getSport(
    @Param('sportId', ParseIntPipe) sportId: number,
  ): Promise<ReadSportDto> {
    return this._sportService.get(sportId);
  }

  @Get()
  @ApiBearerAuth()
  async getSports(): Promise<ReadSportDto[]> {
    return this._sportService.getAll();
  }

  @Post()
  @Roles(RoleType.ADMIN)
  createSport(@Body() sport: Partial<CreateSportDto>): Promise<ReadSportDto> {
    return this._sportService.create(sport);
  }

  @Patch(':sportId')
  @Roles(RoleType.ADMIN)
  updateSport(
    @Param('sportId', ParseIntPipe) sportId: number,
    @Body() sport: Partial<UpdateSportDto>,
  ): Promise<ReadSportDto> {
    return this._sportService.update(sportId, sport);
  }

  @Delete(':sportId')
  @Roles(RoleType.ADMIN)
  deleteSport(@Param('sportId', ParseIntPipe) sportId: number): Promise<void> {
    return this._sportService.delete(sportId);
  }
}
