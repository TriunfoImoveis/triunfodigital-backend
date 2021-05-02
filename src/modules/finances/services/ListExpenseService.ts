import { inject, injectable } from "tsyringe";

import IExpenseRepository from "@modules/finances/repositories/IExpenseRepository";
import Expense from "@modules/finances/infra/typeorm/entities/Expense";

@injectable()
class ListExpenseService {
  constructor(
    @inject('ExpenseRepository')
    private expenseRepository: IExpenseRepository, 
  ) {}

  public async execute(): Promise<Expense[]> {
    const listExpense = await this.expenseRepository.list();

    return listExpense;
  }
}

export default ListExpenseService;