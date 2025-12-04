import {Router} from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import RankingController from '@modules/users/infra/http/controllers/RankingController';
import validatorFields from '@shared/infra/http/validators/validatorFields';
import ensuredAuthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import basicAuthenticated from '@shared/infra/http/middlewares/basicAuth';

const rankingRouter = Router();
const rankingController = new RankingController();

rankingRouter.use((req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const [scheme] = authHeader.split(' ');

  if (scheme && scheme.toLowerCase() === 'basic') {
    return basicAuthenticated(req, res, next);
  }

  return ensuredAuthenticated(req, res, next);
});

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
