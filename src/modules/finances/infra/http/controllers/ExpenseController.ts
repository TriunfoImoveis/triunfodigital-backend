import { Request, Response } from "express";
import { container } from "tsyringe";

import GroupExpenseRepository from "@modules/finances/infra/typeorm/repositories/GroupExpenseRepository";
import ListExpenseService from "@modules/finances/services/ListExpenseService";
import CreateExpenseService from "@modules/finances/services/CreateExpenseService";
import UpdateExpenseService from "@modules/finances/services/UpdateExpenseService";
import DeleteExpenseService from "@modules/finances/services/DeleteExpenseService";
import ShowExpenseService from "@modules/finances/services/ShowExpenseService";
import PaidExpenseService from "@modules/finances/services/PaidExpenseService";
import ExportExpenseService from "@modules/finances/services/ExportExpenseService";
import { ExpenseStatus } from "../../typeorm/entities/Expense";
import AppError from "@shared/errors/AppError";
import { verifyDates } from "@shared/utils/verify_dates";

interface ExpenseRequestQuery {
  subsidiary?: string;
  expense_type?: string;
  status?: string;
  month?: string;
  year?: string;
  dateFrom?: Date;
  dateTo?: Date;
  group?: string;
  page?: number;
  perPage?: number;
  sort?: 'ASC' | 'DESC';
}

class ExpenseController {
  async listGroups(request: Request, response: Response): Promise<Response> {
    const groupsRepository = new GroupExpenseRepository();
    const groups = await groupsRepository.list();

    return response.json(groups);
  }

  async createGroup(request: Request, response: Response): Promise<Response> {
    const groupsRepository = new GroupExpenseRepository();
    const group = await groupsRepository.create(request.body.name);

    return response.json(group);
  }

  async list(request: Request<never, never, never, ExpenseRequestQuery>, response: Response): Promise<Response> {

    const { status, dateFrom, dateTo } = request.query;
    if (status) {
      const statusInstallments = Object.values(ExpenseStatus);
      const statusRequest = status.split(',') as ExpenseStatus[];
      const isValidateStatus = statusRequest.every(status => statusInstallments.includes(status));

      if (!isValidateStatus) {
        throw new AppError(`Invalid status: status must be ${statusInstallments.join(', ')}`, 400);
      }
    }

    const validadeDates = verifyDates(dateFrom, dateTo);

    if (validadeDates.error) {
      throw new AppError(validadeDates.errorMessage, 400);
    }

    const listExpenseService = container.resolve(ListExpenseService);
    const listExpense = await listExpenseService.execute({
      ...request.query,
      status: status ? status as ExpenseStatus : undefined
    });

    return response.json(listExpense);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const showExpenseService = container.resolve(ShowExpenseService);
    const expense = await showExpenseService.execute(request.params.id);

    return response.json(expense);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      expense_type,
      description,
      due_date,
      value,
      group,
      subsidiary,
      user,
      repeat,
    } = request.body;

    const createExpenseService = container.resolve(CreateExpenseService);
    await createExpenseService.execute({
      expense_type,
      description,
      due_date,
      value,
      group,
      subsidiary,
      user,
      repeat,
    });

    return response.status(201).send();
  }

  async update(request: Request, response: Response): Promise<Response> {
    const {id} = request.params;
    const data = request.body;

    const updateExpenseService = container.resolve(UpdateExpenseService);
    const expenseUpdated = await updateExpenseService.execute(id, data);

    return response.json(expenseUpdated);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { ids } = request.query;

    const deleteExpenseService = container.resolve(DeleteExpenseService);
    await deleteExpenseService.execute(ids as string);

    return response.status(204).send();
  }

  async paid(request: Request, response: Response): Promise<Response> {
    const paidExpenseService = container.resolve(PaidExpenseService);
    paidExpenseService.execute({
      id: request.params.id,
      data: request.body,
    });

    return response.status(204).send();
  }

  async exportExcel(request: Request, response: Response): Promise<Response> {
    const exportExpenseService = container.resolve(ExportExpenseService);
    const filePath = await exportExpenseService.execute();
    return response.json(filePath).status(201);
  }
}

export default ExpenseController;
