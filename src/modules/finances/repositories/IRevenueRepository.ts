import Revenue from "@modules/finances/infra/typeorm/entities/Revenue";
import ICreateRevenueDTO from "@modules/finances/dtos/ICreateRevenueDTO";

export default interface IRevenueRepository {
  list(): Promise<Revenue[]>;
  create(data: ICreateRevenueDTO): Promise<Revenue>;
}