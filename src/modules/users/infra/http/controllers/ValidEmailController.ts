import {Request, Response} from 'express';
import { container } from 'tsyringe';

import SendValidEmailService from '@modules/users/services/SendValidEmailService';
import ValidationEmailService from '@modules/users/services/ValidationEmailService';

class ValidEmailController {
  async create(request: Request, response: Response): Promise<Response> {
    const {email} = request.body;
    
    const sendValidEmail = container.resolve(SendValidEmailService);
    await sendValidEmail.execute(email);

    return response.status(204).send();
  }

  async update(request: Request, response: Response): Promise<Response> {

    const validationEmailService = container.resolve(ValidationEmailService);
    await validationEmailService.execute(
      request.params.id
    );
    
    return response.status(204).send();
  }
}

export default ValidEmailController;