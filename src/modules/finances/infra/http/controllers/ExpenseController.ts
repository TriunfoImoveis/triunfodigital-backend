import { Request, Response } from "express";

import GroupExpenseRepository from "@modules/finances/infra/typeorm/repositories/GroupExpenseRepository";


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
}

export default ExpenseController;