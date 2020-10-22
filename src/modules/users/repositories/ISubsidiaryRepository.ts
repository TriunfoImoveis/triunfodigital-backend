import ICreateSubsidiaryDTO from '@modules/users/dtos/ICreateSubsidiaryDTO';
import IUpdateSubsidiaryDTO from '@modules/users/dtos/IUpdateSubsidiaryDTO';
import Subsidiary from '@modules/users/infra/typeorm/entities/Subsidiary';

export default interface ISubsidiaryRepository {
  findByName(name: string): Promise<Subsidiary | undefined>;
  findById(id: string): Promise<Subsidiary | undefined>;
  findSubsidiarysActive(): Promise<Subsidiary[] | undefined>;
  create(data: ICreateSubsidiaryDTO): Promise<Subsidiary>;
  update(
    id: string,
    subsidiary: IUpdateSubsidiaryDTO,
  ): Promise<Subsidiary | undefined>;
  delete(id: string): Promise<void>;
}
