import { Router, Request, Response } from 'express';
import { AuthenticateUserService } from '../services/AuthenticateUserService';
import { AuthResponseDto } from '../types/authentication';

/**
 * @info baseUrl: /sessions
 */

type ErrorMessage = {
  message: string;
};

const sessionsRouter = Router();

sessionsRouter.post(
  '/',
  async (req: Request, res: Response<AuthResponseDto | ErrorMessage>) => {
    try {
      const { email, password } = req.body;

      const authenticateUser = new AuthenticateUserService();

      const { user, token } = await authenticateUser.execute({
        email,
        password,
      });

      return res.json({ user, token });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
);

export default sessionsRouter;
