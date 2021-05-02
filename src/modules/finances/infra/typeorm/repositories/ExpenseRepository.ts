import { getRepository, Repository } from "typeorm";

import Expense from "@modules/finances/infra/typeorm/entities/Expense";
import AppError from "@shared/errors/AppError";
import IExpenseRepository from "@modules/finances/repositories/IExpenseRepository";
import ICreateExpenseDTO from "@modules/finances/dtos/ICreateExpenseDTO";

class ExpenseRepository implements IExpenseRepository {
  private ormRepository: Repository<Expense>;

  constructor() {
    this.ormRepository = getRepository(Expense);
  }

  async list(): Promise<Expense[]> {
    try {
      const expenses = await this.ormRepository.find();
      return expenses;
    }  catch (err) {
      throw new AppError(err.detail);
    }
  }

  async create(data: ICreateExpenseDTO): Promise<Expense> {
    try {
      const expense = this.ormRepository.create(data);
      const newExpense = await this.ormRepository.save(expense);

      return newExpense;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default ExpenseRepository;