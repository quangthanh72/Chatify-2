import { Inject, Injectable } from '@nestjs/common';
import { MessageRepository } from './messages.repository';
import { AUTH_SERVICE, UserDto } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MessagesService {
  constructor(
    private readonly messageRepository: MessageRepository,
    @Inject(AUTH_SERVICE) private readonly authClient: ClientProxy,
  ) {}

  async getUser(_id: string) {
    return this.authClient.send({ cmd: 'get-user' }, { _id });
  }

  async createMessage(createMessageDto: any, { _id }: UserDto) {
    return this.messageRepository.create({
      ...createMessageDto,
      userId: _id,
      isRead: false,
    });
  }
}
