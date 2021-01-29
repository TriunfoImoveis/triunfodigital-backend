import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import SessionController from '@modules/users/infra/http/controllers/SessionController';
import validorFields from '@shared/infra/http/validators/validatorFields';

const sessionsRouter = Router();
const sessionController = new SessionController();

sessionsRouter.post('/', celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required()
      .messages(validorFields({name: "'email'"})),
    password: Joi.string().required()
      .messages(validorFields({name: "'senha'"})),
    office: Joi.string().uuid().required()
      .messages(validorFields({name: "'cargo'"})),
  }
}), sessionController.create);

export default sessionsRouter;
