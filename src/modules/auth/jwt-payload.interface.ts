import { RoleType } from '../role/roletype.enum';
import { UserDetails } from '../user/user.details.entity';

export interface IJwtPayload {
  id: number;
  email: string;
  roles: RoleType[];
  iat?: Date;
}
