import { Request, Response } from 'express';

import AppError from '@shared/errors/AppError';
import CompanyRepository from '@modules/organizations/infra/typeorm/repositories/CompanyRepository';
import CreateCompanyService from '@modules/organizations/services/CreateCompanyService';
import UpdateCompanyService from '@modules/organizations/services/UpdateCompanyService';
import ActivateCompanyService from '@modules/organizations/services/ActivateCompanyService';
import DeactivateCompanyService from '@modules/organizations/services/DeactivateCompanyServivce';

class CompanyController {
  async index(request: Request, response: Response): Promise<Response> {
    const companyRepository = new CompanyRepository();
    const companies = await companyRepository.findAll();

    return response.json(companies);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const companyRepository = new CompanyRepository();
    const company = await companyRepository.findOne(request.params.id);

    if (!company) {
      throw new AppError('Company not exists.');
    }

    return response.json(company);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      cnpj,
    } = request.body;

    const companyRepository = new CompanyRepository();
    const createCompanyService = new CreateCompanyService(companyRepository);

    const newCompany = await createCompanyService.execute({
      name,
      cnpj,
    });

    return response.json(newCompany);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const companyRepository = new CompanyRepository();
    const updateCompanyService = new UpdateCompanyService(companyRepository);

    const companyUpdated = await updateCompanyService.execute({
      id: request.params.id,
      data: request.body,
    });

    return response.json(companyUpdated);
  }

  async activate(request: Request, response: Response): Promise<Response> {
    const companyRepository = new CompanyRepository();
    const activateCompanyService = new ActivateCompanyService(companyRepository);

    const companyActivate = await activateCompanyService.execute({
      id: request.params.id,
    });

    return response.json(companyActivate);
  }

  async deactivate(request: Request, response: Response): Promise<Response> {
    const companyRepository = new CompanyRepository();
    const deactivateCompanyService = new DeactivateCompanyService(companyRepository);

    await deactivateCompanyService.execute({
      id: request.params.id,
    });

    return response.status(204).send();
  }
}

export default CompanyController;
