import Realty from "@modules/sales/infra/typeorm/entities/Realty";
import ICreateRealtyDTO from "@modules/sales/dtos/ICreateRealtyDTO";

export default interface IRealtyRepository {
  findAll(): Promise<Realty[]>;
  findById(id: string): Promise<Realty | undefined>;
  createInstance(data: ICreateRealtyDTO): Promise<Realty | undefined>;
}
