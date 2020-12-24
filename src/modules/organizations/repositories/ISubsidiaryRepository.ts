import ICreateSubsidiaryDTO from '@modules/organizations/dtos/ICreateSubsidiaryDTO';
import IUpdateSubsidiaryDTO from '@modules/organizations/dtos/IUpdateSubsidiaryDTO';
import Subsidiary from '@modules/organizations/infra/typeorm/entities/Subsidiary';

export default interface ISubsidiaryRepository {
  findByName(name: string): Promise<Subsidiary | undefined>;
  findById(id: string): Promise<Subsidiary | undefined>;
  findSubsidiarysActive(): Promise<Subsidiary[]>;
  create(data: ICreateSubsidiaryDTO): Promise<Subsidiary>;
  update(
    id: string,
    subsidiary: IUpdateSubsidiaryDTO,
  ): Promise<Subsidiary | undefined>;
  delete(id: string): Promise<void>;
}
