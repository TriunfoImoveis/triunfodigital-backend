import ICreateOfficeDTO from '@modules/organizations/dtos/ICreateOfficeDTO';
import IUpdateOfficeDTO from '@modules/organizations/dtos/IUpdateOfficeDTO';
import Office from '@modules/organizations/infra/typeorm/entities/Office';

export default interface IOfficeRepository {
  findByName(name: string): Promise<Office | undefined>;
  findById(id: string): Promise<Office | undefined>;
  findOfficesActive(): Promise<Office[]>;
  create(data: ICreateOfficeDTO): Promise<Office>;
  update(office: IUpdateOfficeDTO): Promise<Office>;
  delete(id: string): Promise<void>;
}
