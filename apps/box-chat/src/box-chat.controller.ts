import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { BoxChatService } from './box-chat.service';
import { CreateBoxChatDto } from './dto/create-box-chat.dto';
import { CurrentUser, JwtAuthGuard, UserDto } from '@app/common';
import { Types } from 'mongoose';

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
}
