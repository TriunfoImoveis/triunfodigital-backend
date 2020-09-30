import Builder from "@modules/sales/infra/typeorm/entities/Builder";
import ICreateBuilderDTO from "@modules/sales/dtos/ICreateBuilderDTO";

export default interface IBuilderRepository {
  findByName(name: string): Promise<Builder | undefined>;
  findById(id: string): Promise<Builder | undefined>;
  findByIdAndActivate(id: string): Promise<Builder | undefined>;
  findByCNPJ(cnpj: string): Promise<Builder | undefined>;
  findBuildersActive(): Promise<Builder[]>;

  create(data: ICreateBuilderDTO): Promise<Builder | undefined>;
}
