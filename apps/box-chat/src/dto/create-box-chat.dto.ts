import { IsDateString, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateBoxChatDto {
  @IsString()
  name: string;

  creator: Types.ObjectId;

  @IsDateString()
  createAt: Date;

  memberId: Types.ObjectId[];

  messageId: string[];
}
