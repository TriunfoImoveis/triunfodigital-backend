import { Brackets, getRepository, QueryFailedError, Repository } from "typeorm";

import Expense from "@modules/finances/infra/typeorm/entities/Expense";
import AppError from "@shared/errors/AppError";
import IExpenseRepository from "@modules/finances/repositories/IExpenseRepository";
import ICreateExpenseDTO from "@modules/finances/dtos/ICreateExpenseDTO";
import IUpdateExpenseDTO from "@modules/finances/dtos/IUpdateExpenseDTO";
import IRequestSaldoDTO from "@modules/externals/dtos/IRequestSaldoDTO";
import { IResponseExpenseDTO } from "@modules/finances/dtos/IResponseExpenseDTO";
import { IExpenseRequest } from "@modules/finances/dtos/IRequestExpenseDTO";

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
      if (err instanceof QueryFailedError) {
        throw new AppError(err.message, 500);
      }

      throw new AppError('Internal Server Error', 500);
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
      if (err instanceof QueryFailedError) {
        throw new AppError(err.message, 500);
      }

      throw new AppError('Internal Server Error', 500);
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
      if (err instanceof QueryFailedError) {
        throw new AppError(err.message, 500);
      }

      throw new AppError('Internal Server Error', 500);
    }
  }
  async listAll(): Promise<Expense[]> {
    try {
      const expenses = await this.ormRepository
        .createQueryBuilder("expense")
        .leftJoinAndSelect("expense.subsidiary", "subsidiary")
        .leftJoinAndSelect("expense.bank_data", "bank_data")
        .leftJoinAndSelect("expense.group", "group")
        .leftJoinAndSelect("expense.user", "user")
        .orderBy("expense.due_date", 'DESC')
        .getMany();

      return expenses;
    }  catch (err) {
      if (err instanceof QueryFailedError) {
        throw new AppError(err.message, 500);
      }

      throw new AppError('Internal Server Error', 500);
    }
  }

  async list(data: IExpenseRequest): Promise<IResponseExpenseDTO> {
    const {subsidiary, dateFrom, dateTo, month, year, status, group, expense_type, page = 1, perPage = 10, sort = 'DESC'} = data;
    const skip = (page - 1) * perPage;
    try {
      let querybuilder = this.ormRepository
        .createQueryBuilder("expense")
        .leftJoinAndSelect("expense.subsidiary", "subsidiary")
        .leftJoinAndSelect("expense.bank_data", "bank_data")
        .leftJoinAndSelect("expense.group", "group")
        .leftJoinAndSelect("expense.user", "user")
        .where(new Brackets(qb => {
          if (expense_type) {
            qb.andWhere("expense.expense_type = :expense_type", { expense_type: expense_type})
          }
          if (subsidiary) {
            qb.andWhere("subsidiary.id = :subsidiary", { subsidiary: subsidiary})
          }
          if (group) {
            qb.andWhere("group.id = :group", { group })
          }
          if (status) {
            qb.andWhere("expense.status = :status", { status: status })
          }
          if (month) {
            qb.andWhere('EXTRACT(MONTH FROM expense.due_date) = :month', { month: month })
          }
          if (year) {
            qb.andWhere('EXTRACT(YEAR FROM expense.due_date) = :year', { year: year })
          }

          if (dateFrom && dateTo) {
            qb.andWhere('expense.due_date BETWEEN :dateFrom AND :dateTo', { dateFrom, dateTo })
          }
        }))
        .orderBy("expense.due_date", sort)

        const totalValue = await querybuilder
          .getMany()
          .then(expenses => expenses.reduce((acc, curr) => acc + Number(curr.value), 0));

          const [expenses, totalCount] = await querybuilder
          .skip(skip)
          .take(perPage)
          .getManyAndCount();

      return {expenses, totalExpenses: totalCount, totalValue};
    }  catch (err) {
      if (err instanceof QueryFailedError) {
        throw new AppError(err.message, 500);
      }

      throw new AppError('Internal Server Error', 500);
    }
  }

  async create(data: ICreateExpenseDTO): Promise<Expense> {
    try {
      const expense = this.ormRepository.create(data);
      const newExpense = await this.ormRepository.save(expense);

      return newExpense;
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new AppError(err.message, 500);
      }

      throw new AppError('Internal Server Error', 500);
    }
  }

  async update(id: string, data: IUpdateExpenseDTO): Promise<void> {
    try {
      await this.ormRepository.update(id, data);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new AppError(err.message, 500);
      }

      throw new AppError('Internal Server Error', 500);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.ormRepository.delete(id);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new AppError(err.message, 500);
      }

      throw new AppError('Internal Server Error', 500);
    }
  }
}

export default ExpenseRepository;
