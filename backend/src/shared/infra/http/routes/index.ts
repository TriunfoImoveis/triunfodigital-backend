import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/user.routes';
import sessionRouter from '@modules/users/infra/http/routes//session.routes';
import officeRouter from '@modules/users/infra/http/routes/office.routes';
import departamentRouter from '@modules/users/infra/http/routes/departament.routes';
import subsidiaryRouter from '@modules/users/infra/http/routes/subsidiary.routes';
import clientRouter from '@modules/sales/infra/http/routes/client.routes';


const routes = Router();
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);
routes.use('/office', officeRouter);
routes.use('/departament', departamentRouter);
routes.use('/subsidiary', subsidiaryRouter);
routes.use('/client', clientRouter);

export default routes;
