import Neighborhood from "../infra/typeorm/entities/Neighborhood";
import ICreateNeighborhoodDTO from "../dtos/ICreateNeighborhoodDTO";
import IUpdateNeighborhoodDTO from "../dtos/IUpdateNeighborhoodDTO";
import IRequestNeighborhoodDTO from "../dtos/IRequestNeighborhoodDTO";


export default interface INeighborhoodRepository {
  findById(id: string): Promise<Neighborhood | undefined>;
  findAll(): Promise<Neighborhood[]>;
  create(data: ICreateNeighborhoodDTO): Promise<void>;
  update(id: string, data: IUpdateNeighborhoodDTO): Promise<void>;
  delete(id: string): Promise<void>;
  findByFilters(filters: IRequestNeighborhoodDTO): Promise<Neighborhood[]>;
}
