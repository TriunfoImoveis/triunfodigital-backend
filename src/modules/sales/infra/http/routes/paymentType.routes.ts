import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensuredAthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import PaymentTypeController from '@modules/sales/infra/http/controllers/PaymentTypeController';


const paymentTypeRoutes = Router();
const paymentTypeController = new PaymentTypeController();

paymentTypeRoutes.get('/new', paymentTypeController.listNew);

paymentTypeRoutes.get('/used', paymentTypeController.listUsed);

paymentTypeRoutes.use(ensuredAthenticated);

paymentTypeRoutes.post('/', celebrate({
  [Segments.BODY]: {
    type: Joi.string().valid('NOVO', 'USADO').required(),
    name: Joi.string().required(),
  }
}), paymentTypeController.create);

export default paymentTypeRoutes;
