import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { AuthResponseDto } from './auth.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly expirationJwtTimeInSeconds: number;
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.expirationJwtTimeInSeconds = +(
      this.configService.get<string>('JWT_EXPIRATION_TIME') ?? '3600'
    );
  }

  async signIn(username: string, password: string): Promise<AuthResponseDto> {
    const founderUser = await this.usersService.findByUserName(username);

    if (!founderUser || !bcryptCompareSync(password, founderUser.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: founderUser.id, username: founderUser.username };

    const token = this.jwtService.sign(payload);

    return { token: token, expiresIn: this.expirationJwtTimeInSeconds };
  }
}
