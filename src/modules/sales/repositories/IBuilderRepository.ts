import Builder from "@modules/sales/infra/typeorm/entities/Builder";
import ICreateBuilderDTO from "@modules/sales/dtos/ICreateBuilderDTO";
import IUpdateBuilderDTO from "@modules/sales/dtos/IUpdateBuilderDTO";
import IRequestBuilderDTO from "@modules/sales/dtos/IRequestBuilderDTO";

export default interface IBuilderRepository {
  findBuildersActive(data?: IRequestBuilderDTO): Promise<Builder[]>;
  findByName(name: string): Promise<Builder | undefined>;
  findById(id: string): Promise<Builder | undefined>;
  findByIdAndActivate(id: string): Promise<Builder | undefined>;
  findByCNPJ(cnpj: string): Promise<Builder | undefined>;

  create(data: ICreateBuilderDTO): Promise<Builder | undefined>;
  update(id: string, data: IUpdateBuilderDTO): Promise<Builder | undefined>;
  activate(id: string): Promise<Builder | undefined>;
  deactivate(id: string): Promise<void>;
}
