import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLanguageDto {
  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  readonly id: number;

  @IsString()
  @ApiProperty({ type: String, description: 'string' })
  readonly name: string;
}
