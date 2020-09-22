import { Router } from 'express';

import UsersController from '@modules/users/infra/http/controllers/UsersController';
import idValidUuid from '@shared/infra/http/middlewares/idValidedUuid';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', usersController.index);

usersRouter.post('/', usersController.create);

usersRouter.get('/:id', idValidUuid, usersController.show);

usersRouter.put('/:id', idValidUuid, usersController.update);

usersRouter.patch('/avatar/:id', idValidUuid, usersController.uploadAvatar);

export default usersRouter;
