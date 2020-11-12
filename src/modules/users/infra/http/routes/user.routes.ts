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
      city: Joi.string(),
      office: Joi.string(),
    }
  }),
  usersController.index
);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(15).required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
      phone: Joi.string().required(),
      goal: Joi.number().required(),
      admission_date: Joi.date().required(),
      departament: Joi.string().uuid().required(),
      subsidiary: Joi.string().uuid().required(),
      office: Joi.string().uuid().required(),
    },
  }),
  usersController.create,
);

usersRouter.use(ensuredAuthenticated);

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
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
      phone: Joi.string(),
      goal: Joi.number(),
      admission_date: Joi.date(),
      departament: Joi.string().uuid(),
      subsidiary: Joi.string().uuid(),
      office: Joi.string().uuid(),
    },
  }),
  usersController.update,
);

usersRouter.patch(
  '/avatar',
  upload.single('avatar'),
  usersController.uploadAvatar,
);

export default usersRouter;
