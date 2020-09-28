import { Router } from 'express';
import multer from 'multer';
import { celebrate, Joi, Segments } from 'celebrate';

import UsersController from '@modules/users/infra/http/controllers/UsersController';
import ensuredAuthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import uploadConfig from '@config/upload';

const usersRouter = Router();
const usersController = new UsersController();
const upload = multer(uploadConfig);

usersRouter.get('/', usersController.index);

usersRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone: Joi.string().required(),
    goal: Joi.number().required(),
    admission_date: Joi.date().required(),
    departament_id: Joi.string().uuid().required(),
    office_id: Joi.string().uuid().required(),
  }
}), usersController.create);

usersRouter.get('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  }
}), usersController.show);

usersRouter.put('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  },
  [Segments.BODY]: {
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
    phone: Joi.string(),
    goal: Joi.number(),
    admission_date: Joi.date(),
    departament_id: Joi.string().uuid(),
    office_id: Joi.string().uuid(),
  }
}), usersController.update);

usersRouter.patch('/avatar',
  ensuredAuthenticated,
  upload.single('avatar'),
  usersController.uploadAvatar
);

export default usersRouter;
