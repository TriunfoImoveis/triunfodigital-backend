import Subsidiary from "@modules/organizations/infra/typeorm/entities/Subsidiary";
import { RevenueType } from "@modules/finances/infra/typeorm/entities/Revenue";

export default interface ICreateRevenueDTO {
    revenue_type: RevenueType;
    description: string;
    due_date: Date;
    value_integral: number;
    tax_rate: number;
    invoice_value?: number;
    client: string;
    subsidiary: Subsidiary;
}