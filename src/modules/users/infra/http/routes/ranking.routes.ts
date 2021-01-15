import {Router} from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensuredAuthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import RankingController from '@modules/users/infra/http/controllers/RankingController';


const rankingRouter = Router();
const rankingController = new RankingController();

const date = new Date();

rankingRouter.use(ensuredAuthenticated);

rankingRouter.get('/', celebrate({
  [Segments.QUERY]: {
    type: Joi.string().valid('ANUAL', 'MENSAL').default('ANUAL'),
    city: Joi.string().required(),
    user: Joi.string().valid('Corretor', 'Captador').required(),
  }
}), rankingController.index);

export default rankingRouter;
