import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLanguageDto {
  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  readonly id: number;

  @IsString()
  @ApiProperty({ type: String, description: 'string' })
  readonly name: string;
}
