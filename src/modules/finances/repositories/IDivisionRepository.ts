import Division from "@modules/finances/infra/typeorm/entities/Division";
import ICreateDivisionDTO from "@modules/finances/dtos/ICreateDivisionDTO";

export default interface IDivisionRepository {
  create(data: ICreateDivisionDTO): Promise<Division>;
}