import 'reflect-metadata';
import * as dotenv from 'dotenv';
import * as http from "http";
import * as io from 'socket.io';
import path from 'path';

import express, { Request, Response, NextFunction, Express } from 'express';
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

class App {
  public app: Express;

  constructor() {
    this.app = express();

    this.routes();
    this.middlewares();
    this.execute();
    this.sockets();
  }

  routes() {
    this.app.use(cors({ origin: '*' }));
    this.app.use(express.json());
    this.app.use('/files', express.static(uploadConfig.tmpFolder));
    this.app.use(routes);

    this.app.use(errors());
  }

  middlewares() {
    this.app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
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
  }

  private async sockets() {
    const server: http.Server = http.createServer(this.app);
    const sio: io.Server = new io.Server(server, {transports: ["websocket", "polling"]});
    
    sio.on('connection', (socket: io.Socket) => {
      console.log('connection');

      socket.on('disconnect', () => {
          console.log('client disconnected');
      })
    });
  }

  execute() {
    if (process.env.NODE_ENV === 'develop') {
      this.app.listen(3335, () => {
        console.log('Server started on ::PORT 3335!');
      });
    } else {
      this.app.listen(3333, () => {
        console.log('Server started on ::PORT 3333!');
      });
    }
  }
}

export default new App;