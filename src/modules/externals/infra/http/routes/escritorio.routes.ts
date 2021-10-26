import { Router } from 'express';

import EscritorioController from '@modules/externals/infra/http/controllers/EscritorioController';

const escritorioRouter = Router();
const escritorioController = new EscritorioController();

escritorioRouter.get('/', escritorioController.index);

export default escritorioRouter;
