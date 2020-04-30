import { IsString, MaxLength } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @MaxLength(20, { message: 'This name is not valid' })
  readonly name: string;
}
