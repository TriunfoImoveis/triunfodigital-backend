import { Router } from 'express';

import UsersController from '../controllers/UsersController';
import idValidUuid from '../middlewares/idValidedUuid';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', usersController.index);

usersRouter.post('/', usersController.create);

usersRouter.patch('/:id', idValidUuid, usersController.update);

export default usersRouter;
