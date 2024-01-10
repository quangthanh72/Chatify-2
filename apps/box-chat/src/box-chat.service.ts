import { Injectable } from '@nestjs/common';
import { BoxChatRepository } from './box-chat.repository';
import { UserDto } from '@app/common';
import { CreateBoxChatDto } from './dto/create-box-chat.dto';

@Injectable()
export class BoxChatService {
  constructor(private readonly boxChatRepository: BoxChatRepository) {}

  async create(createBoxChatDto: CreateBoxChatDto, { username }: UserDto) {
    return this.boxChatRepository.create({
      ...createBoxChatDto,
      creator: username,
    });
  }
}
