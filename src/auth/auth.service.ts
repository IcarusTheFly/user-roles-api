import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PasswordService } from '../services/password.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmailWithPassword(email);
    const { password: hashedPassword, ...result } = user;

    const isValidPassword = await this.passwordService.comparePassword(
      password,
      hashedPassword,
    );

    if (isValidPassword) {
      const payload = { email: user.email, sub: user.id };
      const accessToken = this.jwtService.sign(payload);

      return {
        access_token: accessToken,
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
