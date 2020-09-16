import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/user.routes';
import sessionRouter from '@modules/users/infra/http/routes//session.routes';
import officeRouter from '@modules/users/infra/http/routes/office.routes';
import departamentRouter from '@modules/users/infra/http/routes/departament.routes';
import subsidiaryRouter from '@modules/users/infra/http/routes/subsidiary.routes';

const routes = Router();
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);
routes.use('/office', officeRouter);
routes.use('/departament', departamentRouter);
routes.use('/subsidiary', subsidiaryRouter);

export default routes;
