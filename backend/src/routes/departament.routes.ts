import { Router } from 'express';

import CreateDepartamentService from '../services/CreateDepartamentService';

const departamentRouter = Router();

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

export default departamentRouter;
