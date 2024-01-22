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

@Injectable()
export class BoxChatService {
  constructor(
    private readonly boxChatRepository: BoxChatRepository,
    @Inject(AUTH_SERVICE) private readonly authClient: ClientProxy,
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
    });
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

  async findId({ _id }: UserDto, otherId: Types.ObjectId) {
    return this.boxChatRepository.findWith({
      memberId: { $all: [otherId, _id] },
    });
  }
}
