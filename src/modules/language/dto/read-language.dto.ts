import { IsNumber, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ReadLanguageDto {
  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  readonly id: number;

  @Expose()
  @IsString()
  @ApiProperty({ type: String, description: 'string' })
  readonly name: string;
}
