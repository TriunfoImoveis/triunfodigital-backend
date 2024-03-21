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
    year: Joi.string().optional().default('all'),
    month: Joi.string().optional().default('all'),
    subsidiary: Joi.string().optional().default('all'),
    user: Joi.string().valid('Corretor', 'Captador').required(),
  }
}), rankingController.index);

export default rankingRouter;
