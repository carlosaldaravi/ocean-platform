import { StatsModule } from './modules/stats/stats.module';
import { StatsService } from './modules/stats/stats.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/config.keys';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/auth.module';
import { TargetModule } from './modules/target/target.module';
import { CalendarModule } from './modules/calendar/calendar.module';
import { LanguageModule } from './modules/language/language.module';
import { SportModule } from './modules/sport/sport.module';
import { LevelModule } from './modules/level/level.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { CourseModule } from './modules/course/course.module';
import { TransformInterceptor } from './shared/transform.interceptor';
import { ErrorsInterceptor } from './shared/errors.interceptors';
import { FileController } from './modules/file/file.controller';
import { FileService } from './modules/file/file.service';

@Module({
  imports: [
    StatsModule,
    ConfigModule,
    DatabaseModule,
    UserModule,
    RoleModule,
    AuthModule,
    TargetModule,
    CalendarModule,
    LanguageModule,
    SportModule,
    LevelModule,
    CourseModule,
  ],
  providers: [
    StatsService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    FileService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ErrorsInterceptor,
    // },
  ],
  controllers: [FileController],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
