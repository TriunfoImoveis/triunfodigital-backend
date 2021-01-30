import {Request, Response} from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import SendForgotPasswordService from '@modules/users/services/SendForgotPasswordService';

class PasswordController {
  async create(request: Request, response: Response): Promise<Response> {
    const {email} = request.body;
    
    const sendForgotPassword = container.resolve(SendForgotPasswordService);
    await sendForgotPassword.execute({email});

    return response.status(204).send();
  }

  async update(request: Request, response: Response): Promise<Response> {

    const resetPasswordService = container.resolve(ResetPasswordService);
    await resetPasswordService.execute({
      token: request.params.id,
      new_password: request.body.new_password,
    });

    return response.status(204).send();
  }
}

export default PasswordController;