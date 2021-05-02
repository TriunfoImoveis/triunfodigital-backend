import { inject, injectable } from "tsyringe";
import { add } from "date-fns";

import IExpenseRepository from "@modules/finances/repositories/IExpenseRepository";
import { ExpenseType } from "@modules/finances/infra/typeorm/entities/Expense";
import ICreateExpenseDTO from "@modules/finances/dtos/ICreateExpenseDTO";


@injectable()
class CreateExpenseService {
  constructor(
    @inject('ExpenseRepository')
    private expenseRepository: IExpenseRepository,
  ) {}

  public async execute(data: ICreateExpenseDTO): Promise<void> {
    var {
      expense_type, 
      repeat, 
      due_date,
      value,
      description,
      group,
      subsidiary,
      user,
    } = data;

    if (expense_type === ExpenseType.FIX) {
      repeat = repeat ? repeat : 1;
    } else {
      repeat = 1;
    }

    for (var i=0; i<repeat; i++) {
      due_date = add(due_date, {hours: 3});

      await this.expenseRepository.create({
        expense_type,
        description,
        due_date,
        group,
        value,
        subsidiary,
        user,
      });

      due_date = add(due_date, {months: 1});
    }
  }
}

export default CreateExpenseService;