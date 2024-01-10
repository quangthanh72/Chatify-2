import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersDocument } from './users/models/users.schema';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: UsersDocument) {
    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
    };

    const token = this.jwtService.sign(tokenPayload, {
      secret: this.configService.get('JWT_SECRET'),
    });

    return {
      access_token: token,
    };
  }
}
