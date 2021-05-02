import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import ensuredAuthenticated from "@shared/infra/http/middlewares/ensuredAuthenticated";
import ExpenseController from "@modules/finances/infra/http/controllers/ExpenseController";
import validatorFields from "@shared/infra/http/validators/validatorFields";

const expenseRoutes = Router();
const expenseController = new ExpenseController();

expenseRoutes.get('/groups', expenseController.listGroups);

expenseRoutes.use(ensuredAuthenticated);

expenseRoutes.post('/groups', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
  }
}), expenseController.createGroup);

expenseRoutes.get('/', expenseController.list);

expenseRoutes.post('/', celebrate({
  [Segments.BODY]: {
    expense_type: Joi.string().valid(
      "FIXA",
      "VARIAVEL",
    ).required().messages(validatorFields({
      name: "Tipo de Despesa", 
      ref: "[FIXA ou VARIAVEL]"
    })),
    repeat: Joi.when('expense_type', {
      is: "FIXA", 
      then: Joi.number().min(1).max(12).required().messages(
        validatorFields({name: "'Repetição'", min: 1, max: 12})
      ),
    }),
    description: Joi.string().required().messages(validatorFields({
      name: "Descrição"
    })),
    due_date: Joi.date().iso().required().messages(validatorFields({
      name: "'Data de Vencimento'"
    })),
    value: Joi.number().positive().required().messages(validatorFields({
      name: "'Valor'"
    })),
    group: Joi.string().uuid().required().messages(validatorFields({
      name: "Grupo"
    })),
    subsidiary: Joi.string().uuid().required().messages(validatorFields({
      name: "'Filial'"
    })),
    user: Joi.string().uuid().optional().messages(validatorFields({
      name: "Usuário"
    }))
  }
}), expenseController.create);

export default expenseRoutes;