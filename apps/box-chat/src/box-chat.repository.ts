import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { BoxChatDocument } from './models/box-chat.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BoxChatRepository extends AbstractRepository<BoxChatDocument> {
  protected readonly logger = new Logger(BoxChatRepository.name);

  constructor(
    @InjectModel(BoxChatDocument.name) boxChatModel: Model<BoxChatDocument>,
  ) {
    super(boxChatModel);
  }
}
