import { inject, injectable } from "tsyringe";

import IExpenseRepository from "@modules/finances/repositories/IExpenseRepository";
import AppError from "@shared/errors/AppError";


@injectable()
class DeleteExpenseService {
  constructor(
    @inject('ExpenseRepository')
    private expenseRepository: IExpenseRepository,
  ) {}

  public async execute(ids: string): Promise<void> {
    const list_ids = ids.split(",");

    list_ids.forEach(async (id) => {
      const expenseExists = await this.expenseRepository.findById(id);

      if (expenseExists) {
        await this.expenseRepository.delete(id);
      }
    });
  }
}

export default DeleteExpenseService;