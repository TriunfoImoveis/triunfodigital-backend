import { Request, Response } from "express";
import { container } from "tsyringe";

import GroupExpenseRepository from "@modules/finances/infra/typeorm/repositories/GroupExpenseRepository";
import ListExpenseService from "@modules/finances/services/ListExpenseService";
import CreateExpenseService from "@modules/finances/services/CreateExpenseService";


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
}

export default ExpenseController;