import 'reflect-metadata';
import * as dotenv from 'dotenv';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { errors } from 'celebrate';

import routes from '@shared/infra/http/routes';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';

import '@shared/infra/typeorm';
import '@shared/container';
import '@shared/container/providers';

dotenv.config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/files', express.static(uploadConfig.tmpFolder));
app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  });
});

if (process.env.NODE_ENV === 'develop') {
  app.listen(3335, () => {
    console.log('Server started on ::PORT 3335!');
  });
} else {
  app.listen(3333, () => {
    console.log('Server started on ::PORT 3333!');
  });
}
