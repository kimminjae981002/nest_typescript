import { PickType } from '@nestjs/mapped-types';

import { User } from '../entities/user.entity';
import { IsNotEmpty, IsString } from 'class-validator';

// picktype 이것만 사용하겠따.
export class CreateUserDto extends PickType(User, [
  'email',
  'password',
  'name',
  'age',
] as const) {
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}
