import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProfessionService from '@modules/sales/services/CreateProfessionService';
import ListProfessionService from '@modules/sales/services/ListProfessionService';
import UpdateProfessionService from '@modules/sales/services/UpdateProfessionService';
import ProfessionsRepository from '../../typeorm/repositories/ProfessionRepository';
import ShowProfessionService from '@modules/sales/services/ShowProfessionService';

export default class ProfessionController {
   public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

  const professionRepository = new ProfessionsRepository();
    const showProfessionService = new ShowProfessionService(professionRepository);

    const profession = await showProfessionService.execute(id);

    return response.json(profession);
  }
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const professionRepository = new ProfessionsRepository();
    const createProfession = new CreateProfessionService(professionRepository);

    await createProfession.execute({
      name,
    });

    return response.status(204).send();
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { active } = request.query;

    const professionRepository = new ProfessionsRepository();
    const listProfession = new ListProfessionService(professionRepository);

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

    const professionRepository = new ProfessionsRepository();
    const updateProfession = new UpdateProfessionService(professionRepository);

    const profession = await updateProfession.execute({
      id,
      name,
      active,
    });

    return response.json(profession);
  }
}
