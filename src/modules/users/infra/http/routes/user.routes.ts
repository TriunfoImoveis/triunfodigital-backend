import { Router } from 'express';
import multer from 'multer';
import { celebrate, Joi, Segments } from 'celebrate';

import UsersController from '@modules/users/infra/http/controllers/UsersController';
import ensuredAuthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import uploadConfig from '@config/upload';

const usersRouter = Router();
const usersController = new UsersController();
const upload = multer(uploadConfig.multer);

usersRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().default(''),
      city: Joi.string().default('%'),
      departament: Joi.string().default('%'),
      office: Joi.string().default('%'),
    }
  }),
  usersController.index
);

usersRouter.use(ensuredAuthenticated);

usersRouter.post(
  '/',
  // upload.single('avatar'),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(15).required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
      phone: Joi.string().required(),
      goal: Joi.number().required(),
      creci: Joi.string().alphanum().max(6),
      admission_date: Joi.date().required(),
      departament: Joi.string().uuid().required(),
      subsidiary: Joi.string().uuid().required(),
      office: Joi.string().uuid().required(),
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
      name: Joi.string(),
      email: Joi.string().email(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
      phone: Joi.string(),
      goal: Joi.number(),
      creci: Joi.string().alphanum().length(6),
      admission_date: Joi.date(),
      departament: Joi.string().uuid(),
      subsidiary: Joi.string().uuid(),
      office: Joi.string().uuid(),
      active: Joi.boolean(),
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
