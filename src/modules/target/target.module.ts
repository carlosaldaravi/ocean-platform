import { Module } from '@nestjs/common';
import { TargetController } from './target.controller';
import { TargetService } from './target.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TargetRepository } from './target.reposity';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TargetRepository, UserRepository])],
  controllers: [TargetController],
  providers: [TargetService],
})
export class TargetModule {}
