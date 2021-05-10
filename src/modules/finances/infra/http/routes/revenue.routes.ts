import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import ensuredAuthenticated from "@shared/infra/http/middlewares/ensuredAuthenticated";
import RevenueController from "@modules/finances/infra/http/controllers/RevenueController";
import validatorFields from "@shared/infra/http/validators/validatorFields";

const revenueRoutes = Router();
const revenueController = new RevenueController();

revenueRoutes.use(ensuredAuthenticated);

revenueRoutes.get('/', revenueController.list);

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
    tax_rate: Joi.number().positive().required().messages(validatorFields({
      name: "'Taxa de Imposto'"
    })),
    invoice_value: Joi.number().positive().messages(validatorFields({
      name: "'Valor da Nota'"
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
    tax_rate: Joi.number().positive().messages(validatorFields({
      name: "'Taxa de Imposto'"
    })),
    invoice_value: Joi.number().positive().messages(validatorFields({
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
    pay_date: Joi.date().iso().required().messages(validatorFields({
      name: "'Data de Pagamento'"
    })),
    bank_data: Joi.string().uuid().required().messages(validatorFields({
      name: "'Dado Bancário de Entrada'"
    })),
  }
}), revenueController.paid);

export default revenueRoutes;