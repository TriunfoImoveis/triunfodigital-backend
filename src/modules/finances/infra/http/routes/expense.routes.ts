import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import ensuredAuthenticated from "@shared/infra/http/middlewares/ensuredAuthenticated";
import ExpenseController from "@modules/finances/infra/http/controllers/ExpenseController";

const expenseRoutes = Router();
const expenseController = new ExpenseController();

expenseRoutes.get('/groups', expenseController.listGroups);

expenseRoutes.use(ensuredAuthenticated);

expenseRoutes.post('/groups', celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    }
  }), expenseController.createGroup);


export default expenseRoutes;