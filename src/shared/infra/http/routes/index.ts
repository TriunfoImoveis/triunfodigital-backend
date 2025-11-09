import { Router } from 'express';

// USERS
import usersRouter from '@modules/users/infra/http/routes/user.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import sessionRouter from '@modules/users/infra/http/routes//session.routes';
import rankingRouter from '@modules/users/infra/http/routes/ranking.routes';
import validEmailRouter from '@modules/users/infra/http/routes/validEmail.routes';

// ORGANIZATIONS
import officeRouter from '@modules/organizations/infra/http/routes/office.routes';
import departamentRouter from '@modules/organizations/infra/http/routes/departament.routes';
import subsidiaryRouter from '@modules/organizations/infra/http/routes/subsidiary.routes';
import companyRoutes from '@modules/organizations/infra/http/routes/company.routes';

// SALES
import clientRouter from '@modules/sales/infra/http/routes/client.routes';
import builderRouter from '@modules/sales/infra/http/routes/builder.routes';
import propertyRoutes from '@modules/sales/infra/http/routes/property.routes';
import originRoutes from '@modules/sales/infra/http/routes/origin.routes';
import realtyRoutes from '@modules/sales/infra/http/routes/realty.routes';
import saleRoutes from '@modules/sales/infra/http/routes/sale.routes';
import paymentTypeRoutes from '@modules/sales/infra/http/routes/paymentType.routes';
import motiveRoutes from '@modules/sales/infra/http/routes/motive.routes';

// FINANCES
import installmentRoutes from '@modules/finances/infra/http/routes/installment.routes';
import revenueRoutes from '@modules/finances/infra/http/routes/revenue.routes';
import expenseRoutes from '@modules/finances/infra/http/routes/expense.routes';
import calculationRoutes from '@modules/finances/infra/http/routes/calculation.routes';

// NOTIFICATION
import notificationRouter from '@modules/notifications/infra/http/routes/notification.routes';

// EXTERNAL
import despesaRouter from '@modules/externals/infra/http/routes/despesa.routes';
import escritorioRouter from '@modules/externals/infra/http/routes/escritorio.routes';
import contaRouter from '@modules/externals/infra/http/routes/conta.routes';

// DASHBOARD
import dashboardRouter from '@modules/dashboards/infra/http/routes/dashboard.routes';
import scheduledRoutes from '@modules/finances/infra/http/routes/scheduled.routes';
import neighborhoodRouter from '@modules/externals/infra/http/routes/neighborhood.routes';
import professionRouter from '@modules/sales/infra/http/routes/professions.routes';


const routes = Router();

// Module Users
routes.use('/users', usersRouter);
routes.use('/password', passwordRouter);
routes.use('/sessions', sessionRouter);
routes.use('/ranking', rankingRouter);
routes.use('/valid-email', validEmailRouter);

// Module Organizations
routes.use('/office', officeRouter);
routes.use('/departament', departamentRouter);
routes.use('/subsidiary', subsidiaryRouter);
routes.use('/company', companyRoutes);

// Module Sales
routes.use('/client', clientRouter);
routes.use('/builder', builderRouter);
routes.use('/property-type', propertyRoutes);
routes.use('/payment-type', paymentTypeRoutes);
routes.use('/origin-sale', originRoutes);
routes.use('/realty', realtyRoutes);
routes.use('/motive', motiveRoutes);
routes.use('/sale', saleRoutes);

// Module Finances
routes.use('/installment', installmentRoutes);
routes.use('/revenue', revenueRoutes);
routes.use('/expense', expenseRoutes);
routes.use('/calculator', calculationRoutes);

// Module Notifications
routes.use('/notification', notificationRouter);

// Module Externals
routes.use('/despesa', despesaRouter);
routes.use('/escritorio', escritorioRouter);
routes.use('/conta', contaRouter);
routes.use('/neighborhood', neighborhoodRouter);

// Module Dashboards
routes.use('/dashboard', dashboardRouter);

// Test Scheduled Jobs
routes.use('/schedule', scheduledRoutes);

// Module Professions
routes.use('/professions', professionRouter);

export default routes;
