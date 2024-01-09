import { Module } from '@nestjs/common';
import { BoxChatController } from './box-chat.controller';
import { BoxChatService } from './box-chat.service';

@Module({
  imports: [],
  controllers: [BoxChatController],
  providers: [BoxChatService],
})
export class BoxChatModule {}
