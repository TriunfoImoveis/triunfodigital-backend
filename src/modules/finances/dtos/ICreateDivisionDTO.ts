import DivisionType from "@modules/finances/infra/typeorm/entities/DivisionType";

export default interface ICreateDivisionDTO {
  division_type: DivisionType;
  percentage: number;
  value: number;
}