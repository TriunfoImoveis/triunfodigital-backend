import Revenue from "@modules/finances/infra/typeorm/entities/Revenue";
import ICreateRevenueDTO from "@modules/finances/dtos/ICreateRevenueDTO";
import IUpdateRevenueDTO from "@modules/finances/dtos/IUpdateRevenueDTO";
import IResponseRevenueDTO from "@modules/finances/dtos/IResponseRevenueDTO";
import IRequestRevenueDTO from "@modules/finances/dtos/IRequestRevenueDTO";


export default interface IRevenueRepository {
  list(data: IRequestRevenueDTO): Promise<IResponseRevenueDTO>;
  listAll(): Promise<Revenue[]>;
  findById(id: string): Promise<Revenue | undefined>;
  listAndFilterByPayDate(data: IRequestRevenueDTO): Promise<IResponseRevenueDTO>;
  create(data: ICreateRevenueDTO): Promise<Revenue>;
  update(id: string, daata: IUpdateRevenueDTO): Promise<void>;
}
