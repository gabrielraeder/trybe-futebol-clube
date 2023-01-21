import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET || 'seuSegredoAqui';

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  try {
    jwt.verify(token, secret);

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};
