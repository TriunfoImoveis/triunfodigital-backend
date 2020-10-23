import ICreateOfficeDTO from '@modules/users/dtos/ICreateOfficeDTO';
import IUpdateOfficeDTO from '@modules/users/dtos/IUpdateOfficeDTO';
import Office from '@modules/users/infra/typeorm/entities/Office';

export default interface IOfficeRepository {
  findByName(name: string): Promise<Office | undefined>;
  findById(id: string): Promise<Office | undefined>;
  findOfficesActive(): Promise<Office[] | undefined>;
  create(data: ICreateOfficeDTO): Promise<Office>;
  update(office: IUpdateOfficeDTO): Promise<Office>;
  delete(id: string): Promise<void>;
}
