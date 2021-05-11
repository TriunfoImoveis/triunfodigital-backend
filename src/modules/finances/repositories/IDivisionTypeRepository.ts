import DivisionType from "@modules/finances/infra/typeorm/entities/DivisionType";

export default interface IDivisionTypeRepository {
  findAll(): Promise<DivisionType[]>;
  create(name: string): Promise<void>;
}