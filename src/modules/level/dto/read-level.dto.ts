import { IsNumber, IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { ReadTargetDto } from 'src/modules/target/dto';

@Exclude()
export class ReadLevelDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  readonly name: string;

  @Expose()
  @IsNumber()
  readonly order: number;

  @Expose()
  @Type(type => ReadTargetDto)
  readonly level: ReadTargetDto;
}
