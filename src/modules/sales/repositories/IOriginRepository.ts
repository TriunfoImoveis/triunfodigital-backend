import OriginSale from '@modules/sales/infra/typeorm/entities/OriginSale';
import ICreateOriginDTO from '@modules/sales/dtos/ICreateOriginDTO';

export default interface IOriginRepository {
  findAllActive(): Promise<OriginSale[]>;
  findAll(): Promise<OriginSale[]>;
  findById(id: string): Promise<OriginSale | undefined>;
  create(data: ICreateOriginDTO): Promise<OriginSale | undefined>;
}
