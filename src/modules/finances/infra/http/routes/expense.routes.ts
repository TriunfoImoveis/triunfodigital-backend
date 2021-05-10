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
      then: Joi.number().min(1).max(50).required().messages(
        validatorFields({name: "'Repetição'", min: 1, max: 50})
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

expenseRoutes.get('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
}), expenseController.show);

expenseRoutes.put('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
  [Segments.BODY]: {
    expense_type: Joi.string().valid(
      "FIXA",
      "VARIAVEL",
    ).messages(validatorFields({
      name: "Tipo de Despesa", 
      ref: "[FIXA ou VARIAVEL]"
    })),
    description: Joi.string().messages(validatorFields({
      name: "Descrição"
    })),
    due_date: Joi.date().iso().messages(validatorFields({
      name: "'Data de Vencimento'"
    })),
    value: Joi.number().positive().messages(validatorFields({
      name: "'Valor'"
    })),
    group: Joi.string().uuid().messages(validatorFields({
      name: "Grupo"
    })),
    subsidiary: Joi.string().uuid().messages(validatorFields({
      name: "'Filial'"
    })),
    user: Joi.string().uuid().optional().messages(validatorFields({
      name: "Usuário"
    }))
  }
}), expenseController.update);

expenseRoutes.delete('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  }
}), expenseController.delete);

expenseRoutes.patch('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
  [Segments.BODY]: {
    pay_date: Joi.date().iso().required().messages(validatorFields({
      name: "'Data de Pagamento'"
    })),
    value_paid: Joi.number().positive().required().messages(validatorFields({
      name: "'Valor Pago'"
    })),
    bank_data: Joi.string().uuid().required().messages(validatorFields({
      name: "'Dado Bancário de Saída'"
    })),
  }
}), expenseController.paid)

export default expenseRoutes;