import Departament from "@modules/organizations/infra/typeorm/entities/Departament";
import ICreateDepartamentDTO from '@modules/organizations/dtos/ICreateDepartamentDTO';
import IUpdateDepartamentDTO from "@modules/organizations/dtos/IUpdateDepartamentDTO";
import Subsidiary from "@modules/organizations/infra/typeorm/entities/Subsidiary";

export default interface IDepartamentRepository {
  findByName(name: string): Promise<Departament | undefined>;
  findByNameAndSubsidiary(
    name: string,
    subsidiary: Subsidiary,
  ): Promise<Departament | undefined>;
  findById(id: string): Promise<Departament | undefined>;
  findDepartamentsActive(subsidiary: string): Promise<Departament[]>;
  create(data: ICreateDepartamentDTO): Promise<Departament | undefined>;
  update(id: string, data: IUpdateDepartamentDTO): Promise<Departament | undefined>;
  delete(id: string): Promise<void>;
}
