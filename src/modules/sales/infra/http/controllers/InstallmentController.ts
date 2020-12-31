import {Request, Response} from 'express';
import { container } from 'tsyringe';

import CreateInstallmentService from '@modules/sales/services/CreateInstallmentService';

class InstallmentController {
  async create(request: Request, response: Response): Promise<Response> {
    const createInstallmentService = container.resolve(CreateInstallmentService);
    const listInstallment = await createInstallmentService.execute({
      id: request.params.id,
      installments: request.body.installments
    });

    return response.json(listInstallment);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    return response.status(200).send("ok");
  }
}

export default InstallmentController;