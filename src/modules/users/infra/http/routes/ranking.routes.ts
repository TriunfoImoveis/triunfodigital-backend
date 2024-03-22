import {Router} from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensuredAuthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import RankingController from '@modules/users/infra/http/controllers/RankingController';
import validatorFields from '@shared/infra/http/validators/validatorFields';

const rankingRouter = Router();
const rankingController = new RankingController();

rankingRouter.use(ensuredAuthenticated);

rankingRouter.get('/', celebrate({
  [Segments.QUERY]: {
    year: Joi.string().optional().default('').allow(''),
    month: Joi.string().optional().default('').allow(''),
    subsidiary: Joi.string().optional().default('').allow(''),
    typeRanking: Joi.string().valid('sales', 'captivator', 'coordinator').required(),
    office: Joi.string().valid('Corretor', 'Coordenador').required(),
  }
}), rankingController.index);

export default rankingRouter;
