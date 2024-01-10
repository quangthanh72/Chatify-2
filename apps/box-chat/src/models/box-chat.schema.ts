import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class BoxChatDocument extends AbstractDocument {
  @Prop()
  name: string;

  @Prop()
  creator: string;

  @Prop()
  createAt: Date;
}

export const BoxChatSchema = SchemaFactory.createForClass(BoxChatDocument);
