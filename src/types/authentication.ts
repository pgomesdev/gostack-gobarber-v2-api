import { User } from '../models/User';

export type AuthResponseDto = {
  user: User;
  token: string;
};
