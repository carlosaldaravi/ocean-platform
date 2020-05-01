import { Module } from '@nestjs/common';
import { SportController } from './sport.controller';
import { SportService } from './sport.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportRepository } from './sport.reposity';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SportRepository, UserRepository])],
  controllers: [SportController],
  providers: [SportService],
})
export class SportModule {}
