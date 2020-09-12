import { Router } from 'express';

import usersRouter from './user.routes';
import sessionRouter from './session.routes';

const routes = Router();
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);

export default routes;
