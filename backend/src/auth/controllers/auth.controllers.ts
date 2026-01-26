import type { Request, Response, NextFunction } from 'express';
import passport from 'passport';

export const googleAuth = passport.authenticate('google', {
  scope: ['email', 'profile'],
});

export const googleCallback = passport.authenticate('google', {
  successRedirect: '/dashboard',
  failureRedirect: '/auth/failure',
});

export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy(() => {
      res.redirect('/');
    });
  });
};
