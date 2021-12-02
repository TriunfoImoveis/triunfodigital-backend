import { getRepository, Repository } from "typeorm";

import Expense from "@modules/finances/infra/typeorm/entities/Expense";
import AppError from "@shared/errors/AppError";
import IExpenseRepository from "@modules/finances/repositories/IExpenseRepository";
import ICreateExpenseDTO from "@modules/finances/dtos/ICreateExpenseDTO";
import IUpdateExpenseDTO from "@modules/finances/dtos/IUpdateExpenseDTO";
import IRequestSaldoDTO from "@modules/externals/dtos/IRequestSaldoDTO";

class ExpenseRepository implements IExpenseRepository {
  private ormRepository: Repository<Expense>;

  constructor() {
    this.ormRepository = getRepository(Expense);
  }

  async findById(id: string): Promise<Expense | undefined> {
    try {
      const expense = await this.ormRepository.findOne(id, {relations: ["group", "subsidiary", "bank_data", "user"]});

      return expense;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findByStatus(status: string): Promise<Expense[]> {
    try {
      const expenses = await this.ormRepository.find({
        relations: ["group", "subsidiary", "bank_data", "user"],
        where: {
          status: status
        }
      });
      return expenses;
    }  catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findByFilters({
    escritorio,
    conta,
    data_inicio,
    data_fim
  }: IRequestSaldoDTO): Promise<Expense[]> {
    try {
      const expenses = await this.ormRepository.createQueryBuilder("expenses")
      .select()
      .innerJoinAndSelect("expenses.group", "group")
      .innerJoinAndSelect("expenses.subsidiary", "subsidiary")
      .innerJoinAndSelect("expenses.bank_data", "bank_data")
      .leftJoinAndSelect("expenses.user", "user")
      .where("expenses.status = 'PAGO'")
      .andWhere("subsidiary.id::text LIKE :escritorio", {escritorio: escritorio})
      .andWhere("bank_data.id::text LIKE :conta", { conta: conta })
      .andWhere(
        "expenses.pay_date BETWEEN :inicio AND :fim", 
        {inicio: data_inicio, fim: data_fim}
      ).getMany();

      return expenses;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async list(): Promise<Expense[]> {
    try {
      const expenses = await this.ormRepository.find({relations: ["group", "subsidiary", "bank_data", "user"]});
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