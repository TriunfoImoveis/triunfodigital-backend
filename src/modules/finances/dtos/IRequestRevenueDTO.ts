import { RevenueStatus, RevenueType } from "../infra/typeorm/entities/Revenue";

export default interface IRequestRevenueDTO {
  subsidiary?: string;
  revenue_type: RevenueType;
  status?: RevenueStatus | RevenueStatus[];
  month?: string;
  year?: string;
  dateFrom?: Date;
  dateTo?: Date;
  page?: number;
  perPage?: number;
}
