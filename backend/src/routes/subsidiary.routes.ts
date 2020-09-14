import { Router } from 'express';
import { getRepository } from 'typeorm';
import Subsidiary from '../entities/Subsidiary';

const subsidiaryRouter = Router();

subsidiaryRouter.post('/', async (request, response) => {
  const { name, goal } = request.body;
  const subsidiaryRepository = getRepository(Subsidiary);

  const subsidiary = subsidiaryRepository.create({ name, goal });

  const newSubsidiary = await subsidiaryRepository.save(subsidiary);

  return response.json(newSubsidiary);
});

export default subsidiaryRouter;
