import { inject, injectable } from "tsyringe";
import { add } from "date-fns";

import IExpenseRepository from "@modules/finances/repositories/IExpenseRepository";
import IUpdateExpenseDTO from "@modules/finances/dtos/IUpdateExpenseDTO";
import AppError from "@shared/errors/AppError";

interface IRequestDTO {
  id: string;
  data: IUpdateExpenseDTO;
}

@injectable()
class PaidExpenseService {
  constructor(
    @inject('ExpenseRepository')
    private expenseRepository: IExpenseRepository,
  ) {}

  public async execute({id, data}: IRequestDTO): Promise<void> {
    const expenseExists = await this.expenseRepository.findById(id);

    if (!expenseExists) {
      throw new AppError("Despesa não existe.", 404);
    }
    
    if (data.pay_date) {
      data.pay_date = add(data.pay_date, {hours: 3});
    }
    
    await this.expenseRepository.update(id, data);
  }
}

export default PaidExpenseService;