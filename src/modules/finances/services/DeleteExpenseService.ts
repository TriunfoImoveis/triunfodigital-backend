import { inject, injectable } from "tsyringe";

import IExpenseRepository from "@modules/finances/repositories/IExpenseRepository";
import AppError from "@shared/errors/AppError";


@injectable()
class DeleteExpenseService {
  constructor(
    @inject('ExpenseRepository')
    private expenseRepository: IExpenseRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const expenseExists = await this.expenseRepository.findById(id);

    if (!expenseExists) {
      throw new AppError("Despesa não existe.", 404);
    }
    
    await this.expenseRepository.delete(id);
  }
}

export default DeleteExpenseService;