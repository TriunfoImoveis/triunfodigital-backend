import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password, office } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { userAuth, token } = await authenticateUser.execute({
    email,
    password,
    office,
  });

  return response.json({ userAuth, token });
});

export default sessionsRouter;
