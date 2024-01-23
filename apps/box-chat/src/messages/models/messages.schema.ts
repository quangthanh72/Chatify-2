import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ versionKey: false })
export class MessageDocument extends AbstractDocument {
  @Prop()
  userId: Types.ObjectId;

  @Prop()
  chatBoxId: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.Mixed })
  context: any;

  @Prop()
  isRead: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(MessageDocument);
