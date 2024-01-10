import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '@app/common';
import { UsersDocument } from './models/users.schema';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateDto } from './dto/update.dto';

@Controller('api/v1')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('sign-up')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('user/profiles')
  @UseGuards(JwtAuthGuard)
  async getUserProfile(@CurrentUser() user: UsersDocument) {
    console.log(user);
    return user;
  }

  @Get('user/:id')
  @UseGuards(JwtAuthGuard)
  async getUser(@Param('id') userId: any) {
    return this.userService.getUser({ _id: userId });
  }

  @Patch('user/change')
  @UseGuards(JwtAuthGuard)
  async updateUserDto(
    @CurrentUser() user: GetUserDto,
    @Body() updateUserDto: UpdateDto,
  ) {
    return this.userService.updateUserDto(user, updateUserDto);
  }
}
