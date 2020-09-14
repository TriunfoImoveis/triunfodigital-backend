import { Router } from 'express';

import usersRouter from './user.routes';
import sessionRouter from './session.routes';
import officeRouter from './office.routes';
import departamentRouter from './departament.routes';
import subsidiaryRouter from './subsidiary.routes';

const routes = Router();
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);
routes.use('/office', officeRouter);
routes.use('/departament', departamentRouter);
routes.use('/subsidiary', subsidiaryRouter);

export default routes;
