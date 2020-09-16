import { Request, Response, NextFunction } from 'express';
import { isUuid } from 'uuidv4';

import AppError from '../../../errors/AppError';

export default function idValidedUiid(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const validId = isUuid(request.params.id);

  if (!validId) {
    throw new AppError('ID is invalid.');
  }

  return next();
}
