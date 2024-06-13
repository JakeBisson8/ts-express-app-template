import { Request, Response, NextFunction } from 'express';

const httpRedirect = (req: Request, res: Response, next: NextFunction) => {
  if (req.secure) return next();
  return res.redirect(307, `https://${req.headers.host}${req.url}`);
};

export default httpRedirect;
