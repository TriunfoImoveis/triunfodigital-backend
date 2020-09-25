import { Router } from 'express';

import ensuredAthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import idValidedUiid from '@shared/infra/http/middlewares/idValidedUuid';
import ClientController from '@modules/sales/infra/http/controllers/ClientController';

const clientRouter = Router();
const clientController = new ClientController();

clientRouter.use(ensuredAthenticated);

clientRouter.get('/', clientController.index);

clientRouter.post('/', clientController.create);

clientRouter.get('/:id', idValidedUiid, clientController.show);

clientRouter.put('/:id', idValidedUiid, clientController.update);

clientRouter.delete('/:id', idValidedUiid, clientController.delete);

export default clientRouter;
