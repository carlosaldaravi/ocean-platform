import { IsNumber, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

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
}
