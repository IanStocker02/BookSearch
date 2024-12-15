import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  _id: unknown;
  username: string;
  email: string;
}

const secretKey = process.env.JWT_SECRET_KEY || '';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      res.sendStatus(403); // Forbidden
    } else {
      req.user = user as JwtPayload;
      next();
    }
  });
  return;
};

export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};