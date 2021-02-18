import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensuredAthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import InstallmentController from '@modules/finances/infra/http/controllers/InstallmentController';
import validatorFields from '@shared/infra/http/validators/validatorFields';

const installmentRoutes = Router();
const installmentController = new InstallmentController();

installmentRoutes.get('/', installmentController.list);

installmentRoutes.use(ensuredAthenticated);

installmentRoutes.post('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  },
  [Segments.BODY]: {
    installments: Joi.array().items(
      Joi.object({
        installment_number: Joi.number().positive().required()
          .messages(validatorFields({name: "'número da parcela'"})),
        value: Joi.number().positive().required()
          .messages(validatorFields({name: "'valor'"})),
        due_date: Joi.date().iso().required()
          .messages(validatorFields({name: "'data de vencimento'"})),
      })
    ).min(1).required().messages(validatorFields({name: "'parcelas'", min: 1}))
  }
}), installmentController.create);

installmentRoutes.patch('/paid/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  }
}), installmentController.update);

export default installmentRoutes;
