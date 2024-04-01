import { Router } from "express";

import ensuredAuthenticated from "@shared/infra/http/middlewares/ensuredAuthenticated";
import ScheduledController from "../controllers/scheduledController";

const scheduledRoutes = Router();
const scheduledController = new ScheduledController();

scheduledRoutes.use(ensuredAuthenticated);

scheduledRoutes.get('/', scheduledController.index);


export default scheduledRoutes;
