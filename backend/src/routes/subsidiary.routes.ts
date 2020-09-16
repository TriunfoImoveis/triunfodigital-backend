import { Router } from 'express';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Subsidiary from '../entities/Subsidiary';
import idValidUuid from '../middlewares/idValidedUuid';
import UpdateSubsidiaryService from '../services/UpdateSubsidiaryService';

const subsidiaryRouter = Router();

subsidiaryRouter.get('/', async (request, response) => {
  const subsidiaryRepository = getRepository(Subsidiary);

  const subsidiarys = await subsidiaryRepository.find();

  return response.json(subsidiarys);
});


subsidiaryRouter.post('/', async (request, response) => {
  const { name, goal } = request.body;

  const subsidiaryRepository = getRepository(Subsidiary);

  const subsidiary = subsidiaryRepository.create({ name, goal });

  const newSubsidiary = await subsidiaryRepository.save(subsidiary);

  return response.json(newSubsidiary);
});


subsidiaryRouter.get('/:id', idValidUuid, async (request, response) => {
  const subsidiaryRepository = getRepository(Subsidiary);

  const subsidiary = await subsidiaryRepository.findOne(request.params.id);

  if (!subsidiary) {
    throw new AppError('Subsidiary not exist.');
  }

  return response.json(subsidiary);
});


subsidiaryRouter.put('/:id', idValidUuid, async (request, response) => {
  const subsidiaryUpdateService = new UpdateSubsidiaryService();
  const subsidiaryUpdated = await subsidiaryUpdateService.execute({
    id: request.params.id,
    body: request.body,
  });

  return response.json(subsidiaryUpdated);
});


subsidiaryRouter.delete('/:id', idValidUuid, async (request, response) => {
  const subsidiaryRepository = getRepository(Subsidiary);

  await subsidiaryRepository.delete(request.params.id);

  return response.status(204).send();
});

export default subsidiaryRouter;
