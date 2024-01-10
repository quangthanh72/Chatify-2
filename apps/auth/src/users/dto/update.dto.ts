import { IsEmail, IsString } from 'class-validator';

export class UpdateDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}
