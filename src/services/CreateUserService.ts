import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

type CreateUserDto = {
  name: string;
  email: string;
  password: string;
};

export class CreateUserService {
  public async execute({
    name,
    email,
    password,
  }: CreateUserDto): Promise<Omit<User, 'password'>> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new Error('Email address already in use.');
    }

    const hashedPassword = await hash(password, 10);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    delete user.password;

    return user;
  }
}
