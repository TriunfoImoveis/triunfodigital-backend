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
        due_date: Joi.date().greater(new Date()).required(),
      })
    ).min(1).required()
  }
}), installmentController.create);

installmentRoutes.delete('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  },
  [Segments.BODY]: {
    motive: Joi.string().uuid().required(),
    another_motive: Joi.string(),
  }
}), installmentController.delete);

export default installmentRoutes;
