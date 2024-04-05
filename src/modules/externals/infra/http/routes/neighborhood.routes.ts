import { Router } from 'express';
import ensuredAthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import NeighborhoodController from '../controllers/NeighborhoodController';
import { Joi, Segments, celebrate } from 'celebrate';


const neighborhoodRouter = Router();
const neighborhoodController = new NeighborhoodController();

neighborhoodRouter.use(ensuredAthenticated);

neighborhoodRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    city: Joi.string().required(),
    uf: Joi.string().min(2).max(2).required(),
  },
}), neighborhoodController.create);
neighborhoodRouter.get('/', celebrate({
  [Segments.QUERY]: {
    name: Joi.string().optional().default('').allow(''),
    city: Joi.string().optional().default('').allow(''),
    uf: Joi.string().min(2).max(2).optional().default('').allow(''),
    active: Joi.boolean().optional().default(true),
  },
}), neighborhoodController.index);

export default neighborhoodRouter;
