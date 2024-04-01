import Expense from "../infra/typeorm/entities/Expense";

export interface IResponseExpenseDTO {
  expenses: Expense[];
  totalValue: number;
  totalExpenses: number;
}
