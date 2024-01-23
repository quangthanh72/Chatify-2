import { Types } from 'mongoose';

export class CreateMessageDto {
  userId: Types.ObjectId;

  chatBoxId: Types.ObjectId;

  context: any;

  isRead: boolean;
}
