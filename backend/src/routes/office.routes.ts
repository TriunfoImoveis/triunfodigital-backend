import { Router } from 'express';

import CreateOfficeService from '../services/CreateOfficeService';

const officeRouter = Router();

officeRouter.post('/', async (request, response) => {
  const { name } = request.body;

  const createOffice = new CreateOfficeService();
  const office = await createOffice.execute({ name });

  return response.json(office);
});

export default officeRouter;
