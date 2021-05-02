import Subsidiary from "@modules/organizations/infra/typeorm/entities/Subsidiary";
import User from "@modules/users/infra/typeorm/entities/User";
import { ExpenseType } from "@modules/finances/infra/typeorm/entities/Expense";
import GroupExpense from "@modules/finances/infra/typeorm/entities/GroupExpense";

export default interface ICreateExpenseDTO {
  expense_type: ExpenseType;
  description: string;
  due_date: Date;
  value: number;
  group: GroupExpense;
  subsidiary: Subsidiary;
  user?: User;
  repeat?: number;
}