import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensuredAthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import InstallmentController from '@modules/sales/infra/http/controllers/InstallmentController';

const installmentRoutes = Router();
const installmentController = new InstallmentController(); 

installmentRoutes.use(ensuredAthenticated);

installmentRoutes.post('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  },
  [Segments.BODY]: {
    installments: Joi.array().items(
      Joi.object({
        installment_number: Joi.number().integer().min(1).required(),
        value: Joi.number().min(0).required(),
        due_date: Joi.date().iso().greater(Date()).required(),
      })
    ).min(1).required()
  }
}), installmentController.create);

installmentRoutes.patch('/paid/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  },
  [Segments.BODY]: {
    pay_date: Joi.date().iso().max(Date()).required(),
  }
}), installmentController.update);

export default installmentRoutes;
