import { Request,Response } from "express";

import AppError from '@shared/errors/AppError';
import DepartamentsRepository from '@modules/organizations/infra/typeorm/repositories/DepartamentsRepository';
import CreateDepartamentService from "@modules/organizations/services/CreateDepartamentService";
import UpdateDepartamentService from "@modules/organizations/services/UpdateDepartamentService";
import { container } from "tsyringe";
import ListDepartamentService from "@modules/organizations/services/ListDepartamentService";
import ShowDepartamentService from "@modules/organizations/services/ShowDepartamentService";

class DepartamentController {
  async index(request: Request, response: Response): Promise<Response> {
    const { subsidiary } = request.query;

    if (typeof subsidiary !== "string") {
      throw new AppError("Subsidiary not is validate string.", 400);
    }

    const listDepartamentService = container.resolve(ListDepartamentService);
    const departamentsList = await listDepartamentService.execute(
      subsidiary
    );

    return response.json(departamentsList);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    
    const showDepartamentService = container.resolve(
      ShowDepartamentService
    );
    const departament = await showDepartamentService.execute(id);

    return response.json(departament);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      initials,
      goal,
      subsidiary,
    } = request.body;

    const createDepartamentService = container.resolve(CreateDepartamentService);

    const newDepartament = await createDepartamentService.execute({
      name,
      initials,
      goal,
      subsidiary,
    });

    return response.json(newDepartament);

  }

  async update(request: Request, response: Response): Promise<Response> {
    const updateDepartamentService = container.resolve(UpdateDepartamentService);
    const departamentUpdated = await updateDepartamentService.execute({
      id: request.params.id,
      data: request.body,
    });

    return response.json(departamentUpdated);
  }

  // async delete(request: Request, response: Response): Promise<Response> {
  //   const departamentsRepository = new DepartamentsRepository();
  //   await departamentsRepository.delete(request.params.id);

  //   return response.status(204).send();
  // }
}

export default DepartamentController;
