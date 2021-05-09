import { getRepository, Repository } from "typeorm";

import Expense from "@modules/finances/infra/typeorm/entities/Expense";
import AppError from "@shared/errors/AppError";
import IExpenseRepository from "@modules/finances/repositories/IExpenseRepository";
import ICreateExpenseDTO from "@modules/finances/dtos/ICreateExpenseDTO";
import IUpdateExpenseDTO from "@modules/finances/dtos/IUpdateExpenseDTO";

class ExpenseRepository implements IExpenseRepository {
  private ormRepository: Repository<Expense>;

  constructor() {
    this.ormRepository = getRepository(Expense);
  }

  async findById(id: string): Promise<Expense | undefined> {
    try {
      const expense = await this.ormRepository.findOne(id, {relations: ["group", "subsidiary"]});

      return expense;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async list(): Promise<Expense[]> {
    try {
      const expenses = await this.ormRepository.find({relations: ["group", "subsidiary"]});
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

  async update(id: string, data: IUpdateExpenseDTO): Promise<void> {
    try {
      await this.ormRepository.update(id, data);
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.ormRepository.delete(id);
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default ExpenseRepository;