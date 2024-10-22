import { Role, User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

type UserWithoutCredentials = Omit<User, 'password' | 'salt'>;

export class UserEntity implements UserWithoutCredentials {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  isActive: boolean | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  role: Role = 'USER';
}
