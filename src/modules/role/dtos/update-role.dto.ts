import { IsString, MaxLength } from 'class-validator';

export class UpdateRoleDto {
  @IsString()
  @MaxLength(20, { message: 'This name is not valid' })
  readonly name: string;
}
