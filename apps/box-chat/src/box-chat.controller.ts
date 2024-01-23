import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BoxChatService } from './box-chat.service';
import { CreateBoxChatDto } from './dto/create-box-chat.dto';
import { CurrentUser, JwtAuthGuard, UserDto } from '@app/common';
import { Types } from 'mongoose';
import { CreateMessageDto } from './messages/dto/create-message.dto';

@Controller('api/v1/boxchat')
export class BoxChatController {
  constructor(private readonly boxChatService: BoxChatService) {}

  @UseGuards(JwtAuthGuard)
  @Post('withuser/:userid')
  async create(
    @Body() createBoxChatDto: CreateBoxChatDto,
    @CurrentUser() user: UserDto,
    @Param('userid') otherId: Types.ObjectId,
  ) {
    return this.boxChatService.create(createBoxChatDto, user, otherId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('search/:name')
  async findBox(@Param('name') name: string) {
    return this.boxChatService.findWithName(name);
  }

  @UseGuards(JwtAuthGuard)
  @Get('test2/:id')
  async getUser(@Param('id') _id: any) {
    return this.boxChatService.getUser(_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('testing')
  async getBoxChat(@CurrentUser() user: UserDto) {
    return this.boxChatService.findAll(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('ok/:otherId')
  async findId(@CurrentUser() user: UserDto, @Param('otherId') otherId: any) {
    return this.boxChatService.findId(user, otherId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('send/:boxChatId')
  async sendMessage(
    @Param('boxChatId') boxChatId: any,
    @Body() createMessageDto: CreateMessageDto,
    @CurrentUser() user: UserDto,
  ) {
    return this.boxChatService.sendMessage(boxChatId, createMessageDto, user);
  }
}
