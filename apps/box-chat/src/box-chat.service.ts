import { Injectable } from '@nestjs/common';
import { BoxChatRepository } from './box-chat.repository';
import { UserDto } from '@app/common';
import { CreateBoxChatDto } from './dto/create-box-chat.dto';
import { Types } from 'mongoose';

@Injectable()
export class BoxChatService {
  constructor(private readonly boxChatRepository: BoxChatRepository) {}

  async create(
    createBoxChatDto: CreateBoxChatDto,
    { _id }: UserDto,
    otherId: Types.ObjectId,
  ) {
    return this.boxChatRepository.create({
      ...createBoxChatDto,
      creator: _id,
      memberId: [otherId],
    });
  }

  async findAll({ _id }: UserDto) {
    return this.boxChatRepository.findWith({ memberId: _id });
  }
}
