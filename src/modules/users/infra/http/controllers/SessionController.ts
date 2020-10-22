import { Request, Response } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

class SessionController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password, office } = request.body;

    const userReporsitoy = new UsersRepository();
    const authenticateUser = new AuthenticateUserService(userReporsitoy);

    const { userAuth, token } = await authenticateUser.execute({
      email,
      password,
      office,
    });

    return response.json({ userAuth, token });
  }
}

export default SessionController;
