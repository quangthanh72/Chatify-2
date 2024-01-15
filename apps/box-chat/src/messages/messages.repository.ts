import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { MessageDocument } from './models/messages.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MessageRepository extends AbstractRepository<MessageDocument> {
  protected readonly logger = new Logger(MessageRepository.name);

  constructor(
    @InjectModel(MessageDocument.name) messageModel: Model<MessageDocument>,
  ) {
    super(messageModel);
  }
}
