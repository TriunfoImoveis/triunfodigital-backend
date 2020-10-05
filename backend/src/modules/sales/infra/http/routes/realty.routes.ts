import { response, Router } from 'express';
import { getRepository } from 'typeorm';
import Realty from '../../typeorm/entities/Realty';
import AppError from '@shared/errors/AppError';


const realtyRoutes = Router();

realtyRoutes.get('/', async (request, response) => {
  const realtiesRepository = getRepository(Realty);
  const realtys = await realtiesRepository.find();

  return response.json(realtys);
})

realtyRoutes.post('/', async (request, response) => {
  try {
    const realtiesRepository = getRepository(Realty);
    const realty = realtiesRepository.create(request.body);
    const newRealty = await realtiesRepository.save(realty);

    return response.json(newRealty);
  } catch (err) {
    throw new AppError(err.detail);
  }
});

export default realtyRoutes;
