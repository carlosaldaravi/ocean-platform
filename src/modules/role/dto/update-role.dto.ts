import { IsString, MaxLength, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto {
  @IsNumber()
  @ApiProperty({ type: Number, description: 'number' })
  readonly id: number;

  @IsString()
  @MaxLength(20, { message: 'This name is not valid' })
  @ApiProperty({ type: String, description: 'string', maximum: 20 })
  readonly name: string;
}
