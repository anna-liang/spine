import type { Request, Response, NextFunction } from 'express';

export const isUserLoggedIn = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  req.user ? next() : res.sendStatus(401);
};
