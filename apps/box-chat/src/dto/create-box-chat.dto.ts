import { IsDate, IsString } from 'class-validator';

export class CreateBoxChatDto {
  @IsString()
  name: string;

  @IsString()
  creator: string;

  @IsDate()
  createAt: Date;
}
