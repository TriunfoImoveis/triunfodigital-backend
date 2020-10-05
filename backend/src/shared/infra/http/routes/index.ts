import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/user.routes';
import sessionRouter from '@modules/users/infra/http/routes//session.routes';
import officeRouter from '@modules/users/infra/http/routes/office.routes';
import departamentRouter from '@modules/users/infra/http/routes/departament.routes';
import subsidiaryRouter from '@modules/users/infra/http/routes/subsidiary.routes';

import clientRouter from '@modules/sales/infra/http/routes/client.routes';
import builderRouter from '@modules/sales/infra/http/routes/builder.routes';
import propertyRoutes from '@modules/sales/infra/http/routes/property.routes';
import originRoutes from '@modules/sales/infra/http/routes/origin.routes';
import realtyRoutes from '@modules/sales/infra/http/routes/realty.routes';


const routes = Router();

// Module Users
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);
routes.use('/office', officeRouter);
routes.use('/departament', departamentRouter);
routes.use('/subsidiary', subsidiaryRouter);

// Module Sales
routes.use('/client', clientRouter);
routes.use('/builder', builderRouter);
routes.use('/property-type', propertyRoutes);
routes.use('/origin-sale', originRoutes);
routes.use('/realty', realtyRoutes);

export default routes;
