import PropertyType from "@modules/sales/infra/typeorm/entities/PropertyType";

export default interface IUpdateRealtyDTO {
  enterprise?: string;
  unit?: string;
  state?: string;
  city?: string;
  neighborhood?: string;
  property?: PropertyType;
}