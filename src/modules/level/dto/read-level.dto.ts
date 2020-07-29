import { IsNumber, IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { ReadTargetDto } from '../../target/dto';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ReadLevelDto {
  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  readonly id: number;

  @Expose()
  @IsString()
  @ApiProperty({ type: String, description: 'string' })
  readonly name: string;

  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  readonly order: number;

  @Expose()
  @Type(type => ReadTargetDto)
  @ApiProperty({ type: ReadTargetDto, description: 'ReadTargetDto' })
  readonly level: ReadTargetDto;
}
