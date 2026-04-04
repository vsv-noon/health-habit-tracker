import crypto from 'crypto';

import jwt, { Secret } from 'jsonwebtoken';

import { ENV } from '../config/env.js';

export type JwtPayload = {
  userId: number;
  isActivated?: boolean;
};

// const ACCESS_TOKEN_EXPIRES_IN = '15m';
// const ACTIVATION_TOKEN_EXPIRES_IN = '24h';
// const RESET_TOKEN_EXPIRES_IN = '30m';
// export const REFRESH_TOKEN_EXPIRES_IN = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
// const REFRESH_TOKEN_EXPIRES_IN = '7d';
// export const REFRESH_TOKEN_EXPIRES_IN = new Date(Date.now() + 5 * 60 * 1000);

// const signOptions: SignOptions = {
//   // expiresIn: ENV.JWT_EXPIRES_IN,
//   expiresIn: '10m',
// };

export function generateRefreshToken(): string {
  return crypto.randomBytes(64).toString('hex');
}

export function signAccessToken(payload: JwtPayload): string {
  return jwt.sign(payload, ENV.JWT_ACCESS_SECRET as Secret, {
    expiresIn: '15m',
  });
}

export function signActivationToken(payload: JwtPayload): string {
  return jwt.sign(payload, ENV.JWT_ACTiVATION_SECRET, {
    expiresIn: '24h',
  });
}

export function signResetToken(payload: JwtPayload): string {
  return jwt.sign(payload, ENV.JWT_RESET_PASSWORD_SECRET, {
    expiresIn: '30m',
  });
}

export function verifyAccessToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, ENV.JWT_ACCESS_SECRET as Secret) as JwtPayload;
  } catch {
    return null;
  }
}

export function hashToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex');
}
