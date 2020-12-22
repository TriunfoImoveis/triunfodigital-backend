import Company from "@modules/sales/infra/typeorm/entities/Company";
import ICreateCompanyDTO from "@modules/sales/dtos/ICreateCompanyDTO";
import IUpdateCompanyDTO from "@modules/sales/dtos/IUpdateCompanyDTO";


export default interface ICompanyRepository {
  findAll(): Promise<Company[]>;
  findOne(id: string): Promise<Company | undefined>;
  findByCNPJ(cnpj: string): Promise<Company | undefined>;

  create(data: ICreateCompanyDTO): Promise<Company>;
  update(id: string, data: IUpdateCompanyDTO): Promise<Company | undefined>;
  activate(id: string): Promise<Company | undefined>;
  deactivate(id: string): Promise<void>;
}
