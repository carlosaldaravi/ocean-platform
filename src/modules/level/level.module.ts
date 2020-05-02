import { Module } from '@nestjs/common';
import { LevelController } from './level.controller';
import { LevelService } from './level.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelRepository } from './level.reposity';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LevelRepository, UserRepository])],
  controllers: [LevelController],
  providers: [LevelService],
})
export class LevelModule {}
