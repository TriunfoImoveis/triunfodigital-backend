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
    city: Joi.string().required(),
    month: Joi.number().integer().positive().min(1).max(12),
    year: Joi.number()
      .integer()
      .positive()
      .min(2010)
      .max(3000)
      .default(date.getFullYear()),
  }
}), rankingController.index);

export default rankingRouter;
