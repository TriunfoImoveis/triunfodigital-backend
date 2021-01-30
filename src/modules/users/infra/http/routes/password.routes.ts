import {Router} from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import PasswordController from '@modules/users/infra/http/controllers/PasswordController';
import validatorFields from '@shared/infra/http/validators/validatorFields';

const passwordRouter = Router();
const passwordConttroller = new PasswordController();

passwordRouter.post('/forgot', celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required()
      .messages(validatorFields({name: "'email'"})),
  }
}), passwordConttroller.create);

passwordRouter.post('/reset/:id', celebrate({
  [Segments.BODY]: {
    new_password: Joi.string().$.min(6).max(15)
      .rule({ 
        message: "'nova senha' deve ter entre 6 e 15 caracteres" 
      })
      .required().messages(validatorFields({name: "'nova senha'"})),
    password_confirmation: Joi.string().required().valid(Joi.ref('new_password'))
      .messages(validatorFields({name: "'confirmar senha'", ref: "'nova senha'"})),
  }
}), passwordConttroller.update);

export default passwordRouter;