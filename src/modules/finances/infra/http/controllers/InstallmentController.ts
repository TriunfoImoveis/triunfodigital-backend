import {Request, Response} from 'express';
import { container } from 'tsyringe';

import CreateInstallmentService from '@modules/finances/services/CreateInstallmentService';
import UpdateInstallmentService from '@modules/finances/services/UpdateInstallmentService';
import ListInstallmentService from '@modules/finances/services/ListInstallmentService';

class InstallmentController {
  async list(request: Request, response: Response): Promise<Response> {
    const listInstallmentService = container.resolve(ListInstallmentService);
    const listInstallments = await listInstallmentService.execute();

    return response.json(listInstallments);
  }

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
    await updateInstallmentService.execute(
      request.params.id
    );

    return response.status(200).send();
  }
}

export default InstallmentController;