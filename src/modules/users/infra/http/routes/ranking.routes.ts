import {Router} from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import RankingController from '@modules/users/infra/http/controllers/RankingController';


const rankingRouter = Router();
const rankingController = new RankingController();

rankingRouter.get('/', celebrate({
  [Segments.QUERY]: {
    city: Joi.string().required(),
  }
}), rankingController.index);

export default rankingRouter;
