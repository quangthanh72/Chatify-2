import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ versionKey: false })
export class BoxChatDocument extends AbstractDocument {
  @Prop()
  name: string;

  @Prop()
  messageId: [string];

  @Prop()
  creator: Types.ObjectId;

  @Prop()
  memberId: [Types.ObjectId];

  @Prop()
  createAt: Date;
}

export const BoxChatSchema = SchemaFactory.createForClass(BoxChatDocument);
