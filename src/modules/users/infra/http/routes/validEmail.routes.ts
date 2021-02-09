import {Router} from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensuredAuthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import ValidEmailController from '@modules/users/infra/http/controllers/ValidEmailController';
import validatorFields from '@shared/infra/http/validators/validatorFields';

const validationEmailRouter = Router();
const validEmailConttroller = new ValidEmailController();

validationEmailRouter.patch('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
}), validEmailConttroller.update);

validationEmailRouter.use(ensuredAuthenticated);

validationEmailRouter.post('/resend', celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required()
      .messages(validatorFields({name: "'email'"})),
  }
}), validEmailConttroller.create);

export default validationEmailRouter;