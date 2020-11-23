import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { User } from '../models/User';
import { AuthResponseDto } from '../types/authentication';

type AuthenticateUserDto = {
  email: string;
  password: string;
};

export class AuthenticateUserService {
  public async execute({
    email,
    password,
  }: AuthenticateUserDto): Promise<AuthResponseDto> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Incorrect email/password combination.');
    }

    const passwordMatched = await compare(password, user.password as string);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination.');
    }

    delete user.password;

    const token = sign({}, process.env.APP_SECRET as string, {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token };
  }
}
