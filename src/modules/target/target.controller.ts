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
import { ReadTargetDto, CreateTargetDto, UpdateTargetDto } from './dto';
import { TargetService } from './target.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../role/guards/role.guard';
import { RoleType } from '../role/roletype.enum';
import { Roles } from '../role/decorators/role.decoratos';

@Controller('targets')
export class TargetController {
  constructor(private readonly _targetService: TargetService) {}

  @Get(':targetId')
  // @Roles(RoleType.ADMIN)
  // @UseGuards(AuthGuard(), RoleGuard)
  getTarget(
    @Param('targetId', ParseIntPipe) targetId: number,
  ): Promise<ReadTargetDto> {
    return this._targetService.get(targetId);
  }

  @Get()
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  async getTargets(): Promise<ReadTargetDto[]> {
    return this._targetService.getAll();
  }

  @Post()
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  createTarget(
    @Body() target: Partial<CreateTargetDto>,
  ): Promise<ReadTargetDto> {
    return this._targetService.create(target);
  }

  @Patch(':targetId')
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  updateTarget(
    @Param('targetId', ParseIntPipe) targetId: number,
    @Body() target: Partial<UpdateTargetDto>,
  ): Promise<ReadTargetDto> {
    return this._targetService.update(targetId, target);
  }

  @Delete(':targetId')
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  deleteTarget(@Param('targetId', ParseIntPipe) targetId: number) {
    return this._targetService.delete(targetId);
  }
}
