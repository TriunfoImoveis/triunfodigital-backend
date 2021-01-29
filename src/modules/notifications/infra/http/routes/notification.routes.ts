import { Router } from 'express';

import NotificationController from '@modules/notifications/infra/http/controllers/NotificationController';
import ensuredAuthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';

const notificationRouter = Router();
const notificationController = new NotificationController();

notificationRouter.use(ensuredAuthenticated);

notificationRouter.get('/', notificationController.list);

export default notificationRouter;