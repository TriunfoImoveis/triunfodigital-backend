import { inject, injectable } from "tsyringe";
import { add } from "date-fns";

import IExpenseRepository from "@modules/finances/repositories/IExpenseRepository";
import IUpdateExpenseDTO from "@modules/finances/dtos/IUpdateExpenseDTO";
import AppError from "@shared/errors/AppError";
import Expense from "@modules/finances/infra/typeorm/entities/Expense";


@injectable()
class UpdateExpenseService {
  constructor(
    @inject('ExpenseRepository')
    private expenseRepository: IExpenseRepository,
  ) {}

  public async execute(id: string, data: IUpdateExpenseDTO): Promise<Expense> {
    const expenseExists = await this.expenseRepository.findById(id);

    if (!expenseExists) {
      throw new AppError("Despesa não existe.", 404);
    }
    
    if (data.due_date) {
      data.due_date = add(data.due_date, {hours: 3});
    }
    
    await this.expenseRepository.update(id, data);

    const expenseUpdated = await this.expenseRepository.findById(id);

    if (!expenseUpdated) {
      throw new AppError("Despesa não existe.", 404);
    }
    
    return expenseUpdated;
  }
}

export default UpdateExpenseService;