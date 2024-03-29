import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensuredAthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import InstallmentController from '@modules/finances/infra/http/controllers/InstallmentController';
import validatorFields from '@shared/infra/http/validators/validatorFields';
import { StatusInstallment } from '@modules/finances/infra/typeorm/entities/Installment';

const installmentRoutes = Router();
const installmentController = new InstallmentController();

installmentRoutes.use(ensuredAthenticated);

installmentRoutes.get('/', celebrate({
  [Segments.QUERY]: {
    buyer_name: Joi.string().default(''),
    subsidiary: Joi.string().default(''),
    status: Joi.string().valid(
      "PENDENTE",
      "VENCIDO",
      "PAGO",
      "CAIU",
      "LIQUIDADA",
    ),
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
          .messages(validatorFields({name: "'número da parcela'"})),
        value: Joi.number().positive().required()
          .messages(validatorFields({name: "'valor'"})),
        due_date: Joi.date().iso().required()
          .messages(validatorFields({name: "'data de vencimento'"})),
      })
    ).min(1).required().messages(validatorFields({name: "'parcelas'", min: 1}))
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
