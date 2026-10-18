import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import { errors } from 'celebrate';
import request from 'supertest';

import AppError from '../../src/shared/errors/AppError';
import dashboardRouter from '../../src/modules/dashboards/infra/http/routes/dashboard.routes';
import rankingRouter from '../../src/modules/users/infra/http/routes/ranking.routes';
import sessionsRouter from '../../src/modules/users/infra/http/routes/session.routes';
import saleRoutes from '../../src/modules/sales/infra/http/routes/sale.routes';
import usersRouter from '../../src/modules/users/infra/http/routes/user.routes';

const app = express();

app.use(express.json());
app.use('/dashboard', dashboardRouter);
app.use('/ranking', rankingRouter);
app.use('/sessions', sessionsRouter);
app.use('/sale', saleRoutes);
app.use('/users', usersRouter);
app.use(errors());
app.use(
  (
    error: Error,
    _request: Request,
    response: Response,
    _next: NextFunction,
  ) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error.',
    });
  },
);

describe('HTTP routes', () => {
  it('rejects invalid session credentials before authentication', async () => {
    await request(app)
      .post('/sessions')
      .send({
        email: 'invalid-email',
        password: 'password',
        office: 'invalid-office-id',
      })
      .expect(400);
  });

  it('requires authentication to create a user', async () => {
    await request(app)
      .post('/users')
      .send({
        email: 'new.user@example.com',
        password: 'secret1',
        password_confirmation: 'secret1',
        phone: '11987654321',
        goal: 1,
        admission_date: '2026-01-01',
        departament: '550e8400-e29b-41d4-a716-446655440000',
        subsidiary: '550e8400-e29b-41d4-a716-446655440001',
        office: '550e8400-e29b-41d4-a716-446655440002',
        bank_data: [
          {
            bank_name: 'Bank',
            agency: '1234',
            account: '123456',
            account_type: 'CORRENTE',
          },
        ],
      })
      .expect(401, {
        status: 'error',
        message: 'JWT token is missing',
      });
  });

  it('rejects unsupported filters when listing sales', async () => {
    await request(app).get('/sale/').query({ status: 'UNKNOWN' }).expect(400);
  });

  it('validates the required fields when creating a new-property sale', async () => {
    await request(app).post('/sale/new').send({}).expect(400);
  });

  it('validates the required fields when creating a used-property sale', async () => {
    await request(app).post('/sale/used').send({}).expect(400);
  });

  it('requires authentication to access ranking', async () => {
    await request(app).get('/ranking').expect(401, {
      status: 'error',
      message: 'JWT token is missing',
    });
  });

  it('validates the required user when accessing the sellers dashboard', async () => {
    await request(app).get('/dashboard/sellers').expect(400);
  });

  it('rejects unsupported filters when exporting sales to Excel', async () => {
    await request(app)
      .get('/sale/export/excel')
      .query({ status: 'UNKNOWN' })
      .expect(400);
  });
});
