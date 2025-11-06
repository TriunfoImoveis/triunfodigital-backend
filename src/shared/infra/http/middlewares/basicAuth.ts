import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';

export default function basicAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Authorization header is missing', 401);
  }

  const [scheme, credentials] = authHeader.split(' ');

  if (!scheme || !credentials || scheme.toLowerCase() !== 'basic') {
    throw new AppError('Invalid authorization header format. Use Basic', 401);
  }

  let decoded: string;
  try {
    decoded = Buffer.from(credentials, 'base64').toString('utf8');
  } catch {
    throw new AppError('Invalid Basic auth encoding', 401);
  }

  const [user, pass] = decoded.split(':');

  const expectedUser = process.env.POWERBI_BASIC_USER || '';
  const expectedPass = process.env.POWERBI_BASIC_PASSWORD || '';

  if (!expectedUser || !expectedPass) {
    throw new AppError('Basic auth not configured on server', 500);
  }

  if (user === expectedUser && pass === expectedPass) {
    request.user = { id: `powerbi:${user}` } as any;
    return next();
  }

  throw new AppError('Basic authentication failed', 401);
}
