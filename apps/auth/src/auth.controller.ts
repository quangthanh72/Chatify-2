import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Response } from 'express';

import { UsersService } from './users/users.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CurrentUser } from '@app/common';
import { UsersDocument } from './users/models/users.schema';
import { GetUserDto } from './users/dto/get-user.dto';

@Controller('/api/v1')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @CurrentUser() user: UsersDocument,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);

    response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  async authenticate(@Payload() data: any) {
    return data.user;
  }

  @MessagePattern({ cmd: 'get-user' })
  async getUser(@Payload() _id: GetUserDto) {
    console.log('wooooooooooooooooooooooooooooooooooooooooooooooooooooo');
    return this.userService.getUser(_id);
  }
}
