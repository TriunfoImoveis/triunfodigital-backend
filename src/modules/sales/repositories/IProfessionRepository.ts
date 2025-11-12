import Profession from '../infra/typeorm/entities/Professions';
import ICreateProfessionDTO from '../dtos/ICreateProfessionDTO';
import IUpdateProfessionDTO from '../dtos/IUpdateProfessionDTO';

export default interface IProfessionRepository {
  findAll(active?: boolean): Promise<Profession[]>;
  findById(id: string): Promise<Profession | undefined>;
  create(data: ICreateProfessionDTO): Promise<Profession | undefined>;
  update(data: IUpdateProfessionDTO): Promise<Profession | undefined>;
  findByName(name: string): Promise<Profession | undefined>;
}
