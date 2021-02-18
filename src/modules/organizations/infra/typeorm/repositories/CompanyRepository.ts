import { getRepository, Repository } from "typeorm";

import AppError from '@shared/errors/AppError';
import ICompanyRepository from "@modules/organizations/repositories/ICompanyRepository";
import Company from "@modules/organizations/infra/typeorm/entities/Company";
import ICreateCompanyDTO from "@modules/sales/dtos/ICreateCompanyDTO";
import IUpdateCompanyDTO from "@modules/sales/dtos/IUpdateCompanyDTO";


class CompanyRepository implements ICompanyRepository {

  private ormRepository: Repository<Company>;

  constructor() {
    this.ormRepository = getRepository(Company);
  }

  async findAll(): Promise<Company[]> {
    try {
      const companies = await this.ormRepository.find({
        where: {active: true},
        order: {name: "ASC"},
        cache: true,
      });

      return companies;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findOne(id: string): Promise<Company | undefined> {
    try {
      const company = await this.ormRepository.findOne(id);

      return company;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findByCNPJ(cnpj: string): Promise<Company | undefined> {
    try {
      const company = await this.ormRepository.findOne({
        where: { cnpj }
      });
      return company;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async create(data: ICreateCompanyDTO): Promise<Company> {
    try {
      const company = this.ormRepository.create(data);
      const newCompany = await this.ormRepository.save(company);

      return newCompany;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async update(id: string, data: IUpdateCompanyDTO): Promise<Company | undefined> {
    try {
      await this.ormRepository.update(id, data);
      const companyUpdated = await this.ormRepository.findOne(id);
      return companyUpdated;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async deactivate(id: string): Promise<void> {
    try {
      await this.ormRepository.update(id, {active: false});
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async activate(id: string): Promise<Company | undefined> {
    try {
      await this.ormRepository.update(id, {active: true});
      const company = await this.ormRepository.findOne(id);
      return company;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default CompanyRepository;
