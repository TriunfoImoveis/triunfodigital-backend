import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

class SessionController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password, office } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { userAuth, token } = await authenticateUser.execute({
      email,
      password,
      office,
    });

    return response.json({ userAuth, token });
  }
}

export default SessionController;
