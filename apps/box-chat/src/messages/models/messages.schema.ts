import { AbstractDocument } from '@app/common';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ versionKey: true })
export class MessageDocument extends AbstractDocument {
  @Prop()
  userId: string;

  @Prop()
  chatBoxId: string;

  @Prop()
  context: any;

  @Prop()
  isRead: boolean;
}
