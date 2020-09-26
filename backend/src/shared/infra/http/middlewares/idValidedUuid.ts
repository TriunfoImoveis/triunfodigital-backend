import { Request, Response, NextFunction } from 'express';
import { validate } from 'uuid';

import AppError from '@shared/errors/AppError';

export default function idValidedUiid(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const validId = validate(request.params.id);

  if (!validId) {
    throw new AppError('ID is invalid.');
  }

  return next();
}
