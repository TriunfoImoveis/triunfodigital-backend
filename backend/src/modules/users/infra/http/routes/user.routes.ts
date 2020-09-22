import { Router } from 'express';

import UsersController from '@modules/users/infra/http/controllers/UsersController';
import idValidUuid from '@shared/infra/http/middlewares/idValidedUuid';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', usersController.index);

usersRouter.post('/', usersController.create);

usersRouter.get('/:id', idValidUuid, usersController.show);

usersRouter.patch('/:id', idValidUuid, usersController.update);

export default usersRouter;
