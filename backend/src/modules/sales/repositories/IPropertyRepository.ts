import PropertyType from '@modules/sales/infra/typeorm/entities/PropertyType';
import ICreatePropertyDTO from '@modules/sales/dtos/ICreatePropertyDTO';

export default interface IPropertyRepository {
  findAll(): Promise<PropertyType[]>;
  findById(id: string): Promise<PropertyType | undefined>;
  create(data: ICreatePropertyDTO): Promise<PropertyType | undefined>;
}
