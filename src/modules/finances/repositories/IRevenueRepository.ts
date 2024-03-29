import Revenue from "@modules/finances/infra/typeorm/entities/Revenue";
import ICreateRevenueDTO from "@modules/finances/dtos/ICreateRevenueDTO";
import IUpdateRevenueDTO from "@modules/finances/dtos/IUpdateRevenueDTO";
import IResponseRevenueDTO from "@modules/finances/dtos/IResponseRevenueDTO";
import IRequestRevenueDTO from "@modules/finances/dtos/IRequestRevenueDTO";


export default interface IRevenueRepository {
  list(data: IRequestRevenueDTO): Promise<IResponseRevenueDTO>;
  findById(id: string): Promise<Revenue | undefined>;
  create(data: ICreateRevenueDTO): Promise<Revenue>;
  update(id: string, daata: IUpdateRevenueDTO): Promise<void>;
}
