import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { SignupDto, SigninDto, LoggedInDto } from './dto';
import { User } from '../user/user.entity';
import { compare } from 'bcryptjs';
import { IJwtPayload } from './jwt-payload.interface';
import { RoleType } from '../role/roletype.enum';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
    private readonly _jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<void> {
    const { email } = signupDto;
    const userExists = await this._authRepository.findOne({ where: { email } });
    if (userExists) {
      throw new ConflictException('Email already exists');
    }
    return this._authRepository.signup(signupDto);
  }

  async signin(signinDto: SigninDto): Promise<LoggedInDto> {
    const { email, password } = signinDto;
    // const user: User = await this._authRepository.findOne({ where: { email } });
    const user: User = await User.createQueryBuilder('user')
      .innerJoinAndSelect('user.details', 'details')
      .innerJoinAndSelect('user.roles', 'roles')
      .where('user.email = :email')
      .setParameter('email', email)
      .addSelect('user.password')
      .getOne();

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: IJwtPayload = {
      id: user.id,
      email: user.email,
      roles: user.roles.map(r => r.name as RoleType),
    };

    const token = this._jwtService.sign(payload);

    return plainToClass(LoggedInDto, { token, user });
  }

  reloadToken(user) {
    const payload: IJwtPayload = {
      id: user.id,
      email: user.email,
      roles: user.roles.map(r => r.name as RoleType),
    };

    const token = this._jwtService.sign(payload);

    return plainToClass(LoggedInDto, { token, user });
  }
}
