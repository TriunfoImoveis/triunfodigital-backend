import { Router } from 'express';
import multer from 'multer';
import { celebrate, Joi, Segments } from 'celebrate';

import UsersController from '@modules/users/infra/http/controllers/UsersController';
import ensuredAuthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import uploadConfig from '@config/upload';
import validatorFields from '@shared/infra/http/validators/validatorFields';

const usersRouter = Router();
const usersController = new UsersController();
const upload = multer(uploadConfig.multer);

usersRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().default(''),
      subsidiary: Joi.string().default(''),
      departament: Joi.string().default('%'),
      office: Joi.string().default('%'),
    }
  }),
  usersController.index
);

usersRouter.use(ensuredAuthenticated);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required()
        .messages(validatorFields({name: "'nome'"})),
      email: Joi.string().email().required()
        .messages(validatorFields({name: "'email'"})),
      password: Joi.string().$.min(6).max(15)
        .rule({
          message: "'senha' deve ter entre 6 e 15 caracteres"
        })
        .required().messages(validatorFields({
          name: "'senha'"
        })),
      password_confirmation: Joi.string().required().valid(Joi.ref('password'))
        .messages(validatorFields({name: "'confirmar senha'", ref: "'senha'"})),
      phone: Joi.string().pattern(/^[0-9]{11,11}$/).required()
        .messages(validatorFields({name: "'telefone'", max: 11})),
      goal: Joi.number().positive().required()
        .messages(validatorFields({name: "'meta'"})),
      creci: Joi.string().alphanum().max(6)
        .messages(validatorFields({ name: "'creci'", max: 6})),
      admission_date: Joi.date().iso().required()
        .messages(validatorFields({name: "'data de admissão'"})),
      departament: Joi.string().uuid().required()
        .messages(validatorFields({name: "'departamento'"})),
      subsidiary: Joi.string().uuid().required()
        .messages(validatorFields({name: "'filial'"})),
      office: Joi.string().uuid().required()
        .messages(validatorFields({name: "'cargo'"})),
      bank_data: Joi.array().items(
        Joi.object({
          bank_name: Joi.string().required()
            .messages(validatorFields({name: "'Instituição Financeira'"})),
          agency: Joi.string().required()
            .messages(validatorFields({name: "'Agência'"})),
          account: Joi.string().required()
            .messages(validatorFields({name: "'Número da Conta'"})),
          account_type: Joi.string().required().valid(
            'CORRENTE', 'POUPANCA', 'SALARIO',
          ).messages(validatorFields({
            name: "'Tipo da Conta'",
            ref: "[CORRENTE, POUPANCA, SALARIO]",
          })),
        }),
      ).min(1).messages(validatorFields({name: "'Dados Bancários'", min: 1}))
    },
  }),
  usersController.create,
);

usersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid(),
    },
  }),
  usersController.show,
);

usersRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid(),
    },
    [Segments.BODY]: {
      name: Joi.string()
        .messages(validatorFields({name: "'nome'"})),
      email: Joi.string().email()
        .messages(validatorFields({name: "'email'"})),
      old_password: Joi.string()
        .messages(validatorFields({name: "'senha antiga'"})),
      password: Joi.string().$.min(6).max(15)
        .rule({
          message: "'senha' deve ter entre 6 e 15 caracteres"
        })
        .messages(validatorFields({name: "'senha'"})),
      password_confirmation: Joi.string().valid(Joi.ref('password'))
        .messages(validatorFields({name: "'confirmar senha'", ref: "'senha'"})),
      phone: Joi.string().pattern(/^[0-9]{11,11}$/)
        .messages(validatorFields({name: "'telefone'", max: 11})),
      goal: Joi.number().positive()
        .messages(validatorFields({name: "'meta'"})),
      creci: Joi.string().alphanum().max(6)
        .messages(validatorFields({name: "'creci'", max: 6})),
      admission_date: Joi.date().iso()
        .messages(validatorFields({name: "'data de admissão'"})),
      departament: Joi.string().uuid()
        .messages(validatorFields({name: "'departamento'"})),
      subsidiary: Joi.string().uuid()
        .messages(validatorFields({name: "'filial'"})),
      office: Joi.string().uuid()
        .messages(validatorFields({name: "'cargo'"})),
      bank_data: Joi.array().items(
        Joi.object({
          bank_name: Joi.string().required()
            .messages(validatorFields({name: "'Instituição Financeira'"})),
          agency: Joi.string().required()
            .messages(validatorFields({name: "'Agência'"})),
          account: Joi.string().required()
            .messages(validatorFields({name: "'Número da Conta'"})),
          account_type: Joi.string().required().valid(
            'CORRENTE', 'POUPANCA', 'SALARIO',
          ).messages(validatorFields({
            name: "'Tipo da Conta'",
            ref: "[CORRENTE, POUPANCA, SALARIO]",
          })),
        }),
      ).min(1).messages(validatorFields({name: "'Dados Bancários'", min: 1}))
    },
  }),
  usersController.update,
);

usersRouter.patch(
  '/avatar',
  upload.single('avatar'),
  usersController.uploadAvatar,
);

usersRouter.patch('/active/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  }
}), usersController.updateStatusUser);

export default usersRouter;
