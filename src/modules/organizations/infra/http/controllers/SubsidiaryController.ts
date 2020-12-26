import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import CreateSubsidiaryService from '@modules/organizations/services/CreateSubsidiaryService';
import UpdateSubsidiaryService from '@modules/organizations/services/UpdateSubsidiaryService';
import SubsidiaryRepository from '@modules/organizations/infra/typeorm/repositories/SubsidiaryRepository';
import ListSubsidiaryService from '@modules/organizations/services/ListSubsidiaryService';
import ShowSubsidiaryService from '@modules/organizations/services/ShowSubsidiaryService';

class SubsidiaryController {
  async index(request: Request, response: Response): Promise<Response> {
    const listSubsidiaryService = container.resolve(ListSubsidiaryService);
    const subsidiariesList = await listSubsidiaryService.execute();

    return response.json(subsidiariesList);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const showSubsidiaryService = container.resolve(ShowSubsidiaryService);
    const subsidiary = await showSubsidiaryService.execute(
      request.params.id
    );

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

    const createSubsidiaryService = container.resolve(CreateSubsidiaryService);
    const newSubsidiary = await createSubsidiaryService.execute({
      name,
      goal,
      city,
      state,
      country,
    });

    return response.json(newSubsidiary);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const updateSubsidiaryService = container.resolve(UpdateSubsidiaryService);
    
    const subsidiaryUpdated = await updateSubsidiaryService.execute({
      id: request.params.id,
      subsidiary: request.body,
    });

    return response.json(subsidiaryUpdated);
  }

  // async delete(request: Request, response: Response): Promise<Response> {
  //   const subsidiaryRepository = new SubsidiaryRepository();

  //   await subsidiaryRepository.delete(request.params.id);

  //   return response.status(204).send();
  // }
}

export default SubsidiaryController;
