import { Request,Response } from "express";

import AppError from '@shared/errors/AppError';
import DepartamentsRepository from '@modules/users/infra/typeorm/repositories/DepartamentsRepository';
import CreateDepartamentService from "@modules/users/services/CreateDepartamentService";
import SubsidiaryRepository from "@modules/users/infra/typeorm/repositories/SubsidiaryRepository";
import UpdateDepartamentService from "@modules/users/services/UpdateDepartamentService";

class DepartamentController {
  async index(request: Request, response: Response): Promise<Response> {
    const departamentsRepository = new DepartamentsRepository();
    const departamentsList = await departamentsRepository.findDepartamentsActive();

    return response.json(departamentsList);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const departamentsRepository = new DepartamentsRepository();
    const departament = await departamentsRepository.findById(id);

    if (!departament) {
      throw new AppError('Departament not exists.');
    }

    return response.json(departament);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      initials,
      goal,
      subsidiary,
    } = request.body;

    const departamentsRepository = new DepartamentsRepository();
    const subsidiaryRepository = new SubsidiaryRepository();
    const createDepartament = new CreateDepartamentService(departamentsRepository, subsidiaryRepository);

    const newDepartament = await createDepartament.execute({
      name,
      initials,
      goal,
      subsidiary,
    });

    return response.json(newDepartament);

  }

  async update(request: Request, response: Response): Promise<Response> {
    const departamentsRepository = new DepartamentsRepository();
    const departamentService = new UpdateDepartamentService(departamentsRepository);
    const departamentUpdated = await departamentService.execute({
      id: request.params.id,
      data: request.body,
    });

    return response.json(departamentUpdated);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const departamentsRepository = new DepartamentsRepository();
    await departamentsRepository.delete(request.params.id);

    return response.status(204).send();
  }
}

export default DepartamentController;
