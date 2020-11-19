import { Router, Request, Response } from 'express';
import { User } from '../models/User';
import { CreateUserService } from '../services/CreateUserService';

/**
 * @info baseUrl: /users
 */

type ErrorMessage = {
  message: string;
};

const usersRouter = Router();

usersRouter.post(
  '/',
  async (
    req: Request,
    res: Response<Omit<User, 'password'> | ErrorMessage>,
  ) => {
    try {
      const { name, email, password } = req.body;

      const createUser = new CreateUserService();

      const user = await createUser.execute({
        name,
        email,
        password,
      });

      return res.json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
);

export default usersRouter;
