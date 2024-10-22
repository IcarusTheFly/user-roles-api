import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PasswordService } from 'src/services/password.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    console.log('Data contained in creation!', createUserDto);

    const { salt, hashedPassword } = await this.passwordService.hashPassword(
      createUserDto.password,
    );

    const userCreated = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
        salt: salt,
      },
    });
    return this.excludeSensitiveFields(userCreated);
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map((user) => this.excludeSensitiveFields(user));
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return this.excludeSensitiveFields(user);
  }

  findByEmailWithPassword(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    console.log('Data contained in edition!', updateUserDto);
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return this.excludeSensitiveFields(updatedUser);
  }

  async remove(id: string) {
    this.prisma.user.delete({ where: { id } });
    return;
  }

  private excludeSensitiveFields(user: any) {
    const { password, salt, ...result } = user;
    return result;
  }
}
