import { Router } from 'express';

import idValidUuid from '@shared/infra/http/middlewares/idValidedUuid';
import OfficeController from '@modules/users/infra/http/controllers/OfficeController';

const officeRouter = Router();
const officeController = new OfficeController();

officeRouter.get('/', officeController.index);

officeRouter.post('/', officeController.create);

officeRouter.get('/:id', idValidUuid, officeController.show);

officeRouter.put('/:id', idValidUuid, officeController.update);

officeRouter.delete('/:id', idValidUuid, officeController.delete);

export default officeRouter;
