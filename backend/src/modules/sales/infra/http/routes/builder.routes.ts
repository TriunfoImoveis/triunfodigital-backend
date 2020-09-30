import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensuredAthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import BuilderController from '@modules/sales/infra/http/controllers/BuilderController';

const builderRouter = Router();
const builderController = new BuilderController();

// builderRouter.use(ensuredAthenticated);

// builderRouter.get('/', builderController.index);

builderRouter.post('/', builderController.create);

// builderRouter.get('/:id', builderController.show);

// builderRouter.put('/:id', builderController.update);

// builderRouter.patch('/deactivate/:id', builderController.deactivate);


// builderRouter.patch('/activate/:id', builderController.activate);

export default builderRouter;
