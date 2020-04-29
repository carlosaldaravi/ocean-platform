import { createParamDecorator } from '@nestjs/common';
import { UserDto } from '../user/dto/user.dto';

export const GetUser = createParamDecorator((key, req) => {
  return key ? req.args[0].user[key] : req.args[0].user;
});
