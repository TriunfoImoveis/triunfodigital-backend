import { Router } from 'express';
import multer from 'multer';

import UsersController from '@modules/users/infra/http/controllers/UsersController';
import idValidUuid from '@shared/infra/http/middlewares/idValidedUuid';
import ensuredAuthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import uploadConfig from '@config/upload';

const usersRouter = Router();
const usersController = new UsersController();
const upload = multer(uploadConfig);

usersRouter.get('/', usersController.index);

usersRouter.post('/', usersController.create);

usersRouter.get('/:id', idValidUuid, usersController.show);

usersRouter.put('/:id', idValidUuid, usersController.update);

usersRouter.patch('/avatar',
  ensuredAuthenticated,
  upload.single('avatar'),
  usersController.uploadAvatar
);

export default usersRouter;
