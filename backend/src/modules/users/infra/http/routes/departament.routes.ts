import { Router } from 'express';

import idValidedUiid from '@shared/infra/http/middlewares/idValidedUuid';
import DepartamentController from '@modules/users/infra/http/controllers/DepartamentController';

const departamentRouter = Router();
const departamentController = new DepartamentController();

departamentRouter.get('/', departamentController.index);

departamentRouter.post('/', departamentController.create);

departamentRouter.get('/:id', idValidedUiid, departamentController.show);

departamentRouter.put('/:id', idValidedUiid, departamentController.update);

departamentRouter.delete('/:id', idValidedUiid, departamentController.delete);

export default departamentRouter;
