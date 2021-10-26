import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import SaldoController from '@modules/externals/infra/http/controllers/SaldoController';

const saldoRouter = Router();
const saldoController = new SaldoController();

saldoRouter.get('/', saldoController.index);

export default saldoRouter;
