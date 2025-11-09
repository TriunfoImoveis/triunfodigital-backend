import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProfessionService from '@modules/sales/services/CreateProfessionService';
import ListProfessionService from '@modules/sales/services/ListProfessionService';
import UpdateProfessionService from '@modules/sales/services/UpdateProfessionService';

export default class ProfessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createProfession = container.resolve(CreateProfessionService);

    const profession = await createProfession.execute({
      name,
    });

    return response.json(profession);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { active } = request.query;

    const listProfession = container.resolve(ListProfessionService);

    let activeFilter: boolean | undefined;
    if (active === 'true') activeFilter = true;
    if (active === 'false') activeFilter = false;

    const professions = await listProfession.execute({
      active: activeFilter,
    });

    return response.json(professions);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, active } = request.body;

    const updateProfession = container.resolve(UpdateProfessionService);

    const profession = await updateProfession.execute({
      id,
      name,
      active,
    });

    return response.json(profession);
  }
}
