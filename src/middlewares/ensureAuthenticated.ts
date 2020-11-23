import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

type TokenPayload = {
  iat: number;
  exp: number;
  sub: string;
};

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(
      token,
      process.env.APP_SECRET as string,
    ) as TokenPayload;

    const { sub } = decoded;

    req.user = { id: sub };

    return next();
  } catch {
    throw new Error('Invalid JWT token.');
  }
}
