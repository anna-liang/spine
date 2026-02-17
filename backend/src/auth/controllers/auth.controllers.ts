import type { Request, Response, NextFunction } from 'express';
import passport from 'passport';

export const googleAuth = passport.authenticate('google', {
  scope: ['email', 'profile'],
});

export const googleCallback = passport.authenticate('google', {
  successRedirect: `${process.env.DEV_CLIENT_URI}/`,
  failureRedirect: '/auth/failure',
});

export const getUser = (req: Request, res: Response) => {
  return res.json({
    ...req.user,
  });
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy(() => {
      res.redirect(`${process.env.DEV_CLIENT_URI}`);
    });
    res.setHeader('Set-Cookie', 'connect.sid=; Max-Age=0; Path=/; HttpOnly');
  });
};
