import { ExpenseStatus } from "../infra/typeorm/entities/Expense";

export interface IExpenseRequest {
  subsidiary?: string;
  expense_type?: string;
  status?: ExpenseStatus;
  month?: string;
  year?: string;
  dateFrom?: Date;
  dateTo?: Date;
  group?: string;
  page?: number;
  perPage?: number;
  sort?: 'ASC' | 'DESC';
}
