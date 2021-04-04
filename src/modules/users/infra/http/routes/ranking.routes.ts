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
    type: Joi.string().valid('ANUAL', 'MENSAL').default('ANUAL'),
    month: Joi.when('type', {
      is: 'MENSAL', 
      then: Joi.number().min(1).max(12).required().messages(
        validatorFields({name: "'Mês'", min: 1, max: 12})
      ),
    }),
    city: Joi.string().required(),
    user: Joi.string().valid('Corretor', 'Captador').required(),
  }
}), rankingController.index);

export default rankingRouter;
