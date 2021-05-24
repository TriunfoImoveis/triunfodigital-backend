import { inject, injectable } from "tsyringe";
import { add } from "date-fns";

import IExpenseRepository from "@modules/finances/repositories/IExpenseRepository";
import IUpdateExpenseDTO from "@modules/finances/dtos/IUpdateExpenseDTO";
import AppError from "@shared/errors/AppError";
import { ExpenseStatus } from "@modules/finances/infra/typeorm/entities/Expense";

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
    } else if (expenseExists.status === ExpenseStatus.CANC) {
      throw new AppError("Despesa está com status de CANCELADO.", 400);
    } else if (expenseExists.status === ExpenseStatus.PAGO) {
      throw new AppError("Despesa já está com status de PAGO.", 400);
    }
    
    if (data.pay_date) {
      data.pay_date = add(data.pay_date, {hours: 3});
    }
    
    await this.expenseRepository.update(id, {
      pay_date: data.pay_date,
      value_paid: data.value_paid,
      bank_data: data.bank_data,
      status: ExpenseStatus.PAGO,
    });
  }
}

export default PaidExpenseService;