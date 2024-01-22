import { Types } from 'mongoose';

export interface UserDto {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  username: string;
}
