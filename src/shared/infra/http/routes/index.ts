import { Router } from 'express';

// USERS
import usersRouter from '@modules/users/infra/http/routes/user.routes';
import sessionRouter from '@modules/users/infra/http/routes//session.routes';

// ORGANIZATIONS
import officeRouter from '@modules/organizations/infra/http/routes/office.routes';
import departamentRouter from '@modules/organizations/infra/http/routes/departament.routes';
import subsidiaryRouter from '@modules/organizations/infra/http/routes/subsidiary.routes';

// SALES
import clientRouter from '@modules/sales/infra/http/routes/client.routes';
import builderRouter from '@modules/sales/infra/http/routes/builder.routes';
import propertyRoutes from '@modules/sales/infra/http/routes/property.routes';
import originRoutes from '@modules/sales/infra/http/routes/origin.routes';
import companyRoutes from '@modules/sales/infra/http/routes/company.routes';
import realtyRoutes from '@modules/sales/infra/http/routes/realty.routes';
import saleRoutes from '@modules/sales/infra/http/routes/sale.routes';
import paymentTypeRoutes from '@modules/sales/infra/http/routes/paymentType.routes';
import rankingRouter from '@modules/users/infra/http/routes/ranking.routes';
import motiveRoutes from '@modules/sales/infra/http/routes/motive.routes';

const routes = Router();

// Module Users
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);
routes.use('/office', officeRouter);
routes.use('/departament', departamentRouter);
routes.use('/subsidiary', subsidiaryRouter);
routes.use('/ranking', rankingRouter);

// Module Sales
routes.use('/client', clientRouter);
routes.use('/builder', builderRouter);
routes.use('/property-type', propertyRoutes);
routes.use('/payment-type', paymentTypeRoutes);
routes.use('/origin-sale', originRoutes);
routes.use('/company', companyRoutes);
routes.use('/realty', realtyRoutes);
routes.use('/motive', motiveRoutes);
routes.use('/sale', saleRoutes);

export default routes;
