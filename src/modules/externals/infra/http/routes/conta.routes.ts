import { Router } from 'express';

import ContaController from '@modules/externals/infra/http/controllers/ContaController';

const contaRouter = Router();
const contaController = new ContaController();

contaRouter.get('/', contaController.index);

export default contaRouter;
