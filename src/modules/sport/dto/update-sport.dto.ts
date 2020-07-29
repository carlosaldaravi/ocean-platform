import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSportDto {
  @IsString()
  @ApiProperty({ type: String, description: 'string' })
  readonly name: string;

  @IsString()
  @ApiProperty({ type: String, description: 'string' })
  readonly description: string;
}
