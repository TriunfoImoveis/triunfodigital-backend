import {Request, Response} from 'express';
import { container } from 'tsyringe';

import CheckInstallmentService from '@modules/finances/services/CheckInstallmentService';
class ScheduledController {
  async index(
    request: Request,
    response: Response
  ): Promise<Response> {
    const checkInstallmentService = container.resolve(CheckInstallmentService);
    await checkInstallmentService.execute();

    return response.json({ ok: true});
  }


}

export default ScheduledController;
