import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Response } from 'express';
import { SignInDto } from './users/dto/sign-in.dto';
import { UsersService } from './users/users.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';

@Controller('/api/v1')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.userService.validateUser(email, password);

    return this.authService.login(user);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Res() res: Response) {
    res.setHeader('Authorization', null);
    res.setHeader('Refresh-Token', null);

    return res.status(200).send({ message: 'Logout successful' });
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern({ cmd: 'authenticate' })
  async authenticate(@Ctx() context: RmqContext) {
    return context;
  }
}
