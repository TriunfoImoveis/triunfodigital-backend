import { inject, injectable } from "tsyringe";

import IExpenseRepository from "@modules/finances/repositories/IExpenseRepository";
import Expense from "@modules/finances/infra/typeorm/entities/Expense";

@injectable()
class ListExpenseService {
  constructor(
    @inject('ExpenseRepository')
    private expenseRepository: IExpenseRepository, 
  ) {}

  public async execute(status: string | undefined): Promise<Expense[]> {
    if (status !== undefined) {
      var listExpense = await this.expenseRepository.findByStatus(status);
    } else {
      var listExpense = await this.expenseRepository.list();
    }

    return listExpense;
  }
}

export default ListExpenseService;