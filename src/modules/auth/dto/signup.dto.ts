import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
