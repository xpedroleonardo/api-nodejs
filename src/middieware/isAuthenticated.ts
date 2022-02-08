import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayLoad {
  id_token: string;
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
    const { id_token } = verify(token, process.env.JWT_SECRET) as IPayLoad;

    req.id_auth = id_token;

    return next();
  } catch (error) {
    return res.status(401).end();
  }
}
