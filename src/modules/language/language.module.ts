import { Module } from '@nestjs/common';
import { LanguageController } from './language.controller';
import { LanguageService } from './language.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageRepository } from './language.reposity';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LanguageRepository, UserRepository])],
  controllers: [LanguageController],
  providers: [LanguageService],
})
export class LanguageModule {}
