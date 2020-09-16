import ICreateOfficeDTO from '../dtos/ICreateOfficeDTO';
import IUpdateOfficeDTO from '../dtos/IUpdateOfficeDTO';
import Office from '../infra/typeorm/entities/Office';

export default interface IOfficeRepository {
  findByName(name: string): Promise<Office | undefined>;
  findById(id: string): Promise<Office | undefined>;
  findOfficesActive(): Promise<Office[] | undefined>;
  create(data: ICreateOfficeDTO): Promise<Office>;
  update(office: IUpdateOfficeDTO): Promise<Office>;
}
