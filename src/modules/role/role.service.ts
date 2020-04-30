import {
  Injectable,
  BadRequestException,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { plainToClass } from 'class-transformer';
import { ReadRoleDto, CreateRoleDto, UpdateRoleDto } from './dto';
import { status } from 'src/shared/entity-status.enum';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
  ) {}
  async get(id: number): Promise<ReadRoleDto> {
    if (!id) {
      throw new BadRequestException('Id must be sent');
    }

    const role: Role = await this._roleRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!role) {
      throw new HttpException('This role does not exists', HttpStatus.OK);
    }

    return plainToClass(ReadRoleDto, role);
  }

  async getAll(): Promise<ReadRoleDto[]> {
    const roles: Role[] = await this._roleRepository.find({
      where: { status: 'ACTIVE' },
    });

    if (!roles) {
      throw new HttpException('This role does not exists', HttpStatus.OK);
    }

    return roles.map((role: Role) => plainToClass(ReadRoleDto, role));
  }

  async create(role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
    const foundRole: Role = await this._roleRepository.findOne({
      where: { name: role.name },
    });

    if (foundRole) {
      if (foundRole.status === status.INACTIVE) {
        foundRole.status = status.ACTIVE;
        await foundRole.save();
        return plainToClass(ReadRoleDto, foundRole);
      } else {
        throw new HttpException('This role already exists', HttpStatus.OK);
      }
    } else {
      const savedRole: Role = await this._roleRepository.save(role);
      return plainToClass(ReadRoleDto, savedRole);
    }
  }

  async update(id: number, role: Partial<UpdateRoleDto>): Promise<ReadRoleDto> {
    const foundRole: Role = await this._roleRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });
    if (!foundRole) {
      throw new HttpException('This role does not exists', HttpStatus.OK);
    }
    foundRole.name = role.name;

    const updatedRole = await this._roleRepository.save(foundRole);

    return plainToClass(ReadRoleDto, updatedRole);
  }

  async delete(id: number): Promise<void> {
    const roleExists = await this._roleRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!roleExists) {
      throw new HttpException('This role does not exists', HttpStatus.OK);
    }

    await this._roleRepository.update(id, { status: 'INACTIVE' });
  }
}
