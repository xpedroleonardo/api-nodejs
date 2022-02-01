import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayLoad {
  sub: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ");

  if (!token) {
    return res.status(401).end();
  }

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayLoad;

    req.user_id = sub;

    return next();
  } catch (error) {
    return res.status(401).end();
  }
}
