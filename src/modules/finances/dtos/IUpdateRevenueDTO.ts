import Subsidiary from "@modules/organizations/infra/typeorm/entities/Subsidiary";
import { RevenueStatus, RevenueType } from "@modules/finances/infra/typeorm/entities/Revenue";
import BankData from "@modules/users/infra/typeorm/entities/BankData";

export default interface IUpdateRevenueDTO {
    revenue_type?: RevenueType;
    description?: string;
    due_date?: Date;
    value_integral?: number;
    tax_rate?: number;
    invoice_value?: number;
    client?: string;
    subsidiary?: Subsidiary;
    pay_date?: Date;
    bank_data?: BankData;
    status?: RevenueStatus;
}