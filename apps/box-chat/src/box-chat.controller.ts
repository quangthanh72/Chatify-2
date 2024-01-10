import { Controller } from '@nestjs/common';
import { BoxChatService } from './box-chat.service';

@Controller()
export class BoxChatController {
  constructor(private readonly boxChatService: BoxChatService) {}
}
