import { Controller, UseGuards, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../role/guards/role.guard';
import { StatsService } from './stats.service';
import { ReadStatsDto } from './dto/read-stats.dto';

@Controller('stats')
@UseGuards(AuthGuard('jwt'), RoleGuard)
export class StatsController {
  constructor(private readonly _statsService: StatsService) {}
  @Get(':month/:year')
  getStats(
    @Param('month') month: string,
    @Param('year') year: string,
  ): Promise<ReadStatsDto> {
    return this._statsService.get(month, year);
  }
}
