import Departament from "@modules/users/infra/typeorm/entities/Departament";
import ICreateDepartamentDTO from '@modules/users/dtos/ICreateDepartamentDTO';
import IUpdateDepartamentDTO from "@modules/users/dtos/IUpdateDepartamentDTO";
import Subsidiary from "../infra/typeorm/entities/Subsidiary";

export default interface IDepartamentRepository {
  findByName(name: string): Promise<Departament | undefined>;
  findByNameAndSubsidiary(
    name: string,
    subsidiary: Subsidiary,
  ): Promise<Departament | undefined>;
  findById(id: string): Promise<Departament | undefined>;
  findDepartamentsActive(subsidiary: string): Promise<Departament[] | undefined>;
  create(data: ICreateDepartamentDTO): Promise<Departament | undefined>;
  update(id: string, data: IUpdateDepartamentDTO): Promise<Departament | undefined>;
  delete(id: string): Promise<void>;
}
