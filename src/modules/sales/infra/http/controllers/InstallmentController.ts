import {Request, Response} from 'express';
import { container } from 'tsyringe';

import CreateInstallmentService from '@modules/sales/services/CreateInstallmentService';
import UpdateInstallmentService from '@modules/sales/services/UpdateInstallmentService';

class InstallmentController {
  async create(request: Request, response: Response): Promise<Response> {
    const createInstallmentService = container.resolve(CreateInstallmentService);
    const listInstallment = await createInstallmentService.execute({
      id: request.params.id,
      installments: request.body.installments
    });

    return response.json(listInstallment);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const updateInstallmentService = container.resolve(UpdateInstallmentService);
    await updateInstallmentService.execute({
      id: request.params.id,
      data: request.body,
    });

    return response.status(200).send();
  }
}

export default InstallmentController;