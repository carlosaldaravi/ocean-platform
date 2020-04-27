import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
export class SigninDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
