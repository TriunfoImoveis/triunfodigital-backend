import { inject, injectable } from "tsyringe";

import IExpenseRepository from "@modules/finances/repositories/IExpenseRepository";
import { IResponseExpenseDTO } from "../dtos/IResponseExpenseDTO";
import { IExpenseRequest } from "../dtos/IRequestExpenseDTO";

@injectable()
class ListExpenseService {
  constructor(
    @inject('ExpenseRepository')
    private expenseRepository: IExpenseRepository,
  ) {}

  public async execute(data: IExpenseRequest): Promise<IResponseExpenseDTO> {
    const {expenses, totalExpenses, totalValue} = await this.expenseRepository.list(data);

    return {expenses, totalExpenses, totalValue};
  }
}

export default ListExpenseService;
