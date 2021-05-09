import Revenue from "@modules/finances/infra/typeorm/entities/Revenue";
import ICreateRevenueDTO from "@modules/finances/dtos/ICreateRevenueDTO";
import IUpdateRevenueDTO from "@modules/finances/dtos/IUpdateRevenueDTO";

export default interface IRevenueRepository {
  list(): Promise<Revenue[]>;
  findById(id: string): Promise<Revenue | undefined>;
  create(data: ICreateRevenueDTO): Promise<Revenue>;
  update(id: string, daata: IUpdateRevenueDTO): Promise<void>;
}