import { Request, Response } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

class SessionController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password, office } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { userAuth, token } = await authenticateUser.execute({
      email,
      password,
      office,
    });

    return response.json({ userAuth, token });
  }
}

export default SessionController;
