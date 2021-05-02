import { inject, injectable } from "tsyringe";

import IExpenseRepository from "@modules/finances/repositories/IExpenseRepository";
import AppError from "@shared/errors/AppError";
import Expense from "@modules/finances/infra/typeorm/entities/Expense";


@injectable()
class ShowExpenseService {
  constructor(
    @inject('ExpenseRepository')
    private expenseRepository: IExpenseRepository,
  ) {}

  public async execute(id: string): Promise<Expense> {
    const expenseExists = await this.expenseRepository.findById(id);
    
    if (!expenseExists) {
      throw new AppError("Despesa não existe.", 404);
    }
    
    return expenseExists;
  }
}

export default ShowExpenseService;