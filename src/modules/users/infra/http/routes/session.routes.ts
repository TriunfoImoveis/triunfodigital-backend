import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import SessionController from '@modules/users/infra/http/controllers/SessionController';

const sessionsRouter = Router();
const sessionController = new SessionController();

sessionsRouter.post('/', celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    office: Joi.string().uuid().required(),
  }
}), sessionController.create);

export default sessionsRouter;
