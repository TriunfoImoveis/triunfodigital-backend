import { Request, Response } from "express";
import { container } from "tsyringe";

import DivisionTypeRepository from "@modules/finances/infra/typeorm/repositories/DivisionTypeRepository";
import CreateCalculationService from "@modules/finances/services/CreateCalculationService";

class CalculatorController {
  async findaAllDivision(request: Request, response: Response): Promise<Response> {
    const divisionTypesRepository = new DivisionTypeRepository();
    const division_types = await divisionTypesRepository.findAll();

    return response.json(division_types);
  }

  async createDivision(request: Request, response: Response): Promise<Response> {
    const divisionTypesRepository = new DivisionTypeRepository();
    await divisionTypesRepository.create(request.body.name);

    return response.status(201).send();
  }

  async createCalculation(request: Request, response: Response): Promise<Response> {
    const createCalculationService = container.resolve(CreateCalculationService);
    const calculation = await createCalculationService.execute(request.body);

    return response.status(201).json(calculation);
  }
}

export default CalculatorController;