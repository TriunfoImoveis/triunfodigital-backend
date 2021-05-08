import { Request, Response } from "express";
import { container } from "tsyringe";

import GroupExpenseRepository from "@modules/finances/infra/typeorm/repositories/GroupExpenseRepository";
import ListExpenseService from "@modules/finances/services/ListExpenseService";
import CreateExpenseService from "@modules/finances/services/CreateExpenseService";
import UpdateExpenseService from "@modules/finances/services/UpdateExpenseService";
import DeleteExpenseService from "@modules/finances/services/DeleteExpenseService";
import ShowExpenseService from "@modules/finances/services/ShowExpenseService";


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

  async list(request: Request, response: Response): Promise<Response> {
    const listExpenseService = container.resolve(ListExpenseService);
    const listExpense = await listExpenseService.execute();

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
    const {id} = request.params;

    const deleteExpenseService = container.resolve(DeleteExpenseService);
    await deleteExpenseService.execute(id);

    return response.status(204).send();
  }
}

export default ExpenseController;