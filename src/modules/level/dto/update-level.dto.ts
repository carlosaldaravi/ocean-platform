import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLevelDto {
  @IsString()
  @ApiProperty({ type: String, description: 'string' })
  readonly name: string;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  readonly order: number;
}
