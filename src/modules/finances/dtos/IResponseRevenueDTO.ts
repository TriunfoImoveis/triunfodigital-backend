import Revenue from "@modules/finances/infra/typeorm/entities/Revenue";

export default interface IResponseRevenueDTO {
  revenues: Revenue[];
  total: number;
  totalValueIntegralRevenues: number;
}

