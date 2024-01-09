import { Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Response } from 'express';

@Controller('/api/v1')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any, @Res() res: Response) {
    const { user } = req;
    const accessToken = await this.authService.generateAccessToken(user);
    const refreshToken = await this.authService.genarateRefreshToken(user);

    res.setHeader('Authorization', `Bearer ${accessToken.accessToken}`);
    res.setHeader('Refresh-Token', refreshToken.refreshToken);

    return res.status(200).send({ message: 'Login successful' });
  }
}
