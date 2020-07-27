import { Module } from '@nestjs/common';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarRepository } from './calendar.reposity';
import { CourseCalendarRepository } from './course-calendar.reposity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CalendarRepository, CourseCalendarRepository]),
  ],
  controllers: [CalendarController],
  providers: [CalendarService],
})
export class CalendarModule {}
