import { Request, Response } from 'express';

import AppError from '@shared/errors/AppError';
import CreateSubsidiaryService from '@modules/organizations/services/CreateSubsidiaryService';
import UpdateSubsidiaryService from '@modules/organizations/services/UpdateSubsidiaryService';
import SubsidiaryRepository from '@modules/organizations/infra/typeorm/repositories/SubsidiaryRepository';

class SubsidiaryController {
  async index(request: Request, response: Response): Promise<Response> {
    const subsidiaryRepository = new SubsidiaryRepository();
    const subsidiariesList = await subsidiaryRepository.findSubsidiarysActive();

    return response.json(subsidiariesList);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const subsidiaryRepository = new SubsidiaryRepository();
    const subsidiary = await subsidiaryRepository.findById(request.params.id);

    if (!subsidiary) {
      throw new AppError('Subsidiary not exist.');
    }

    return response.json(subsidiary);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      goal,
      city,
      state,
      country,
    } = request.body;

    const subsidiaryRepository = new SubsidiaryRepository();
    const createSubsidiary = new CreateSubsidiaryService(subsidiaryRepository);

    const subsidiary = await createSubsidiary.execute({
      name,
      goal,
      city,
      state,
      country,
    });

    return response.json(subsidiary);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const subsidiaryRepository = new SubsidiaryRepository();
    const updateSubsidiary = new UpdateSubsidiaryService(subsidiaryRepository);
    
    const subsidiaryUpdated = await updateSubsidiary.execute({
      id: request.params.id,
      subsidiary: request.body,
    });

    return response.json(subsidiaryUpdated);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const subsidiaryRepository = new SubsidiaryRepository();

    await subsidiaryRepository.delete(request.params.id);

    return response.status(204).send();
  }
}

export default SubsidiaryController;
