import { Injectable } from '@nestjs/common';

@Injectable()
export class BoxChatService {
  getHello(): string {
    return 'Hello World!';
  }
}
