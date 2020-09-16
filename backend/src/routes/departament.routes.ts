import { Router } from 'express';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Departament from '../entities/Departament';
import idValidedUiid from '../middlewares/idValidedUuid';
import CreateDepartamentService from '../services/CreateDepartamentService';
import UpdateDepartamentService from '../services/UpdateDepartamentService';

const departamentRouter = Router();

departamentRouter.get('/', async (request, response) => {
  const departamentRepository = getRepository(Departament);
  const departaments = await departamentRepository.find();

  return response.json(departaments);
});


departamentRouter.post('/', async (request, response) => {
  const { name, initials, goal, subsidiary_id } = request.body;

  const createDepartament = new CreateDepartamentService();
  const departament = await createDepartament.execute({
    name,
    initials,
    goal,
    subsidiary_id,
  });

  return response.json(departament);
});


departamentRouter.get('/:id', idValidedUiid, async (request, response) => {
  const departamentRepository = getRepository(Departament);
  const departament = await departamentRepository.findOne(request.params.id);

  if (!departament) {
    throw new AppError('Departament not exist.');
  }

  return response.json(departament);
});


departamentRouter.put('/:id', idValidedUiid, async (request, response) => {
  const updateDepartamentService = new UpdateDepartamentService();

  const departamentUpdated = await updateDepartamentService.execute({
    id: request.params.id,
    body: request.body,
  });

  return response.json(departamentUpdated);
});


departamentRouter.delete('/:id', idValidedUiid, async (request, response) => {
  const departamentRepository = getRepository(Departament);

  await departamentRepository.delete(request.params.id);

  return response.json(204).send();
});

export default departamentRouter;
