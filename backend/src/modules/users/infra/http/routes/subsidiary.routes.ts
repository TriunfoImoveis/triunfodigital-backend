import { Router } from 'express';

import idValidUuid from '@shared/infra/http/middlewares/idValidedUuid';
import SubsidiaryController from '@modules/users/infra/http/controllers/SubsidiaryController';

const subsidiaryRouter = Router();
const subsidiaryController = new SubsidiaryController();

subsidiaryRouter.get('/', subsidiaryController.index);

subsidiaryRouter.post('/', subsidiaryController.create);

subsidiaryRouter.get('/:id', idValidUuid, subsidiaryController.show);

subsidiaryRouter.put('/:id', idValidUuid, subsidiaryController.update);

subsidiaryRouter.delete('/:id', idValidUuid, subsidiaryController.delete);

export default subsidiaryRouter;
