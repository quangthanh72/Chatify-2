import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { BoxChatRepository } from './box-chat.repository';
import { AUTH_SERVICE, UserDto } from '@app/common';
import { CreateBoxChatDto } from './dto/create-box-chat.dto';
import { Types } from 'mongoose';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, take } from 'rxjs';
import { MessagesService } from './messages/messages.service';
import { CreateMessageDto } from './messages/dto/create-message.dto';

@Injectable()
export class BoxChatService {
  constructor(
    private readonly boxChatRepository: BoxChatRepository,
    @Inject(AUTH_SERVICE) private readonly authClient: ClientProxy,
    private readonly messageService: MessagesService,
  ) {}

  async getUser(_id: Types.ObjectId) {
    return this.authClient.send<UserDto>(
      { cmd: 'get-user' },
      {
        _id,
      },
    );
  }

  async create(
    createBoxChatDto: CreateBoxChatDto,
    { _id }: UserDto,
    otherId: Types.ObjectId,
  ) {
    await this.validateBoxChatExist(_id, otherId);

    const data = await (await this.getUser(otherId)).pipe(take(2));
    const user = await firstValueFrom(data);

    console.log(user);

    return this.boxChatRepository.create({
      ...createBoxChatDto,
      creator: _id,
      name: user.name,
      memberId: [otherId, _id],
      messageId: [],
    });
  }

  async sendMessage(
    boxChatId: Types.ObjectId,
    createMessageDto: CreateMessageDto,
    user: UserDto,
  ) {
    await this.validateIsMember(user._id, boxChatId);

    const newMessage = await this.messageService.createMessage(
      createMessageDto,
      user,
    );

    const createAt = new Date();

    return this.boxChatRepository.findOneAndUpdate(
      { _id: boxChatId },
      {
        $push: {
          messageId: {
            $each: [{ messageId: newMessage._id, createAt }],
            $sort: { createAt: -1 },
          },
        },
      },
    );
  }

  async findAll({ _id }: UserDto) {
    return this.boxChatRepository.findWith({ memberId: _id });
  }

  async findWithName(name: string) {
    return this.boxChatRepository.findWith({ name: name });
  }

  async validateBoxChatExist(_id: Types.ObjectId, otherId: Types.ObjectId) {
    const boxChat = await this.boxChatRepository.findWith({
      memberId: { $all: [otherId, _id] },
    });
    if (boxChat.length != 0) {
      throw new UnprocessableEntityException('Box Chat already exist.');
    }

    return;
  }

  async validateIsMember(_id: Types.ObjectId, boxChatId: Types.ObjectId) {
    const boxChat = await this.boxChatRepository.findWith({
      _id: boxChatId,
      memberId: _id,
    });

    if (boxChat.length == 0) {
      throw new UnprocessableEntityException('You are not member of this chat');
    }

    return;
  }

  async findId({ _id }: UserDto, otherId: Types.ObjectId) {
    return this.boxChatRepository.findWith({
      memberId: { $all: [otherId, _id] },
    });
  }
}
