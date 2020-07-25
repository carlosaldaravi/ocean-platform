import { Injectable, HttpStatus, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ReadStatsDto } from './dto/read-stats.dto';

@Injectable()
export class StatsService {
  async get(month: string, year: string): Promise<ReadStatsDto> {
    let stats;
    if (!month || !year) {
      throw new BadRequestException('month and year must be sent');
    }
    console.log('month: ', month);
    console.log('year: ', year);

    return plainToClass(ReadStatsDto, stats);
  }
}
