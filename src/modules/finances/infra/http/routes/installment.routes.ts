import { Router } from 'express';
import { celebrate, Joi, Segments} from 'celebrate';
import {equal} from 'joi'

import ensuredAthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import InstallmentController from '@modules/finances/infra/http/controllers/InstallmentController';
import validatorFields from '@shared/infra/http/validators/validatorFields';

const installmentRoutes = Router();
const installmentController = new InstallmentController();

installmentRoutes.use(ensuredAthenticated);

installmentRoutes.get('/', celebrate({
  [Segments.QUERY]: {
    buyer_name: Joi.string().default('').allow(''),
    subsidiary: Joi.string().default('').allow(''),
    status: Joi.string().default('').allow('').empty('').trim().regex(/^[A-Z,]+$/),
    month: Joi.string().default('').allow(''),
    year: Joi.string().default('').allow(''),
    dateFrom: Joi.date().iso().allow(''),
    dateTo: Joi.when('dateFrom', {
      is: Joi.exist(),
      then: Joi.date().iso().required().not(equal(Joi.ref('dateFrom'))).greater(Joi.ref('dateFrom')),
      otherwise: Joi.date().iso().default('').allow('')
    }).when('dateFrom', {
      is: Joi.exist(),
      then: Joi.required()
    }),
    page: Joi.number().optional().default(1),
    perPage: Joi.number().optional().default(10),
  }
}), installmentController.list);

installmentRoutes.post('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  },
  [Segments.BODY]: {
    installments: Joi.array().items(
      Joi.object({
        installment_number: Joi.number().positive().required()
          .messages(validatorFields({ name: "'número da parcela'" })),
        value: Joi.number().positive().required()
          .messages(validatorFields({ name: "'valor'" })),
        due_date: Joi.date().iso().required()
          .messages(validatorFields({ name: "'data de vencimento'" })),
      })
    ).min(1).required().messages(validatorFields({ name: "'parcelas'", min: 1 }))
  }
}), installmentController.create);

installmentRoutes.get('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  }
}), installmentController.show);

installmentRoutes.patch('/paid/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  }
}), installmentController.update);

installmentRoutes.get('/export/excel', installmentController.exportExcel);

export default installmentRoutes;
