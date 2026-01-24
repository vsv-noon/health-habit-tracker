import jwt, { Secret, SignOptions } from 'jsonwebtoken';

import { env } from '../config/env.js';

export type JwtPayload = {
  userId: number;
};

const signOptions: SignOptions = {
  expiresIn: env.JWT_EXPIRES_IN,
};

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, env.JWT_SECRET as Secret, signOptions);
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
}
