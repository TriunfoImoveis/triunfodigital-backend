import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import ensuredAuthenticated from "@shared/infra/http/middlewares/ensuredAuthenticated";
import RevenueController from "@modules/finances/infra/http/controllers/RevenueController";
import validatorFields from "@shared/infra/http/validators/validatorFields";
import { equal } from "joi";

const revenueRoutes = Router();
const revenueController = new RevenueController();

revenueRoutes.use(ensuredAuthenticated);

revenueRoutes.get('/', celebrate({
  [Segments.QUERY]: {
    buyer_name: Joi.string().default('').allow(''),
    subsidiary: Joi.string().default('').allow(''),
    revenue_type: Joi.string().valid('CREDITO', 'DESPACHANTE').default('').allow(''),
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
}), revenueController.list);

revenueRoutes.post('/', celebrate({
  [Segments.BODY]: {
    revenue_type: Joi.string().valid(
      "CREDITO",
      "DESPACHANTE",
    ).required().messages(validatorFields({
      name: "'Tipo de Receita'",
      ref: "[CREDITO ou DESPACHANTE]"
    })),
    description: Joi.string().required().messages(validatorFields({
      name: "'Descrição'"
    })),
    due_date: Joi.date().iso().required().messages(validatorFields({
      name: "'Data de Vencimento'"
    })),
    value_integral: Joi.number().positive().required().messages(validatorFields({
      name: "'Valor Bruto'"
    })),
    client: Joi.string().min(3).required().messages(validatorFields({
      name: "'Cliente'",
      min: 3
    })),
    subsidiary: Joi.string().uuid().required().messages(validatorFields({
      name: "'Filial'"
    })),
  }
}), revenueController.create);

revenueRoutes.get('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  }
}), revenueController.show);

revenueRoutes.put('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
  [Segments.BODY]: {
    revenue_type: Joi.string().valid(
      "CREDITO",
      "DESPACHANTE",
    ).messages(validatorFields({
      name: "'Tipo de Receita'",
      ref: "[CREDITO ou DESPACHANTE]"
    })),
    description: Joi.string().messages(validatorFields({
      name: "'Descrição'"
    })),
    due_date: Joi.date().iso().messages(validatorFields({
      name: "'Data de Vencimento'"
    })),
    value_integral: Joi.number().positive().messages(validatorFields({
      name: "'Valor Bruto'"
    })),
    tax_rate: Joi.number().min(0).default(0).messages(validatorFields({
      name: "'Taxa de Imposto'"
    })),
    invoice_value: Joi.number().min(0).messages(validatorFields({
      name: "'Valor da Nota'"
    })),
    client: Joi.string().min(3).messages(validatorFields({
      name: "'Cliente'",
      min: 3
    })),
    subsidiary: Joi.string().uuid().messages(validatorFields({
      name: "'Filial'"
    })),
  }
}), revenueController.update);

revenueRoutes.patch('/paid/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
  [Segments.BODY]: {
    tax_rate: Joi.number().min(0).default(0).messages(validatorFields({
      name: "'Taxa de Imposto'"
    })),
    invoice_value: Joi.number().min(0).messages(validatorFields({
      name: "'Valor da Nota'"
    })),
    pay_date: Joi.date().iso().required().messages(validatorFields({
      name: "'Data de Pagamento'"
    })),
    bank_data: Joi.string().uuid().required().messages(validatorFields({
      name: "'Dado Bancário de Entrada'"
    })),
  }
}), revenueController.paid);

revenueRoutes.get('/export/excel', revenueController.exportExcel);

export default revenueRoutes;
