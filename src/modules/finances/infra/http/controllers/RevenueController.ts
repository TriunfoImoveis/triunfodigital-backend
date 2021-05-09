import { Request, Response } from "express";
import { container } from "tsyringe";

import ListRevenueService from "@modules/finances/services/ListRevenueService";
import CreateRevenueService from "@modules/finances/services/CreateRevenueService";
import UpdateRevenueService from "@modules/finances/services/UpdateRevenueService";
import ShowRevenueService from "@modules/finances/services/ShowRevenueService";
import PaidRevenueService from "@modules/finances/services/PaidRevenueService";

class RevenueController {
  async list(request: Request, response: Response): Promise<Response> {
    const listRevenueService = container.resolve(ListRevenueService);
    const revenues = await listRevenueService.execute();
    return response.json(revenues);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const showRevenueService = container.resolve(ShowRevenueService);
    const revenue = await showRevenueService.execute(request.params.id);
    return response.json(revenue);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      revenue_type,
      description,
      due_date,
      value_integral,
      tax_rate,
      invoice_value,
      client,
      subsidiary,
    } = request.body;
    
    const createRevenueService = container.resolve(CreateRevenueService);
    const newRevenue = await createRevenueService.execute({
      revenue_type,
      description,
      due_date,
      value_integral,
      tax_rate,
      invoice_value,
      client,
      subsidiary,
    });

    return response.json(newRevenue);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const updateRevenueService = container.resolve(UpdateRevenueService);
    await updateRevenueService.execute({
      id: request.params.id,
      data: request.body,
    });

    return response.status(204).send();
  }

  async paid(request: Request, response: Response): Promise<Response> {
    const paidRevenueService = container.resolve(PaidRevenueService);
    await paidRevenueService.execute({
      id: request.params.id,
      data: request.body,
    });

    return response.status(204).send();
  }
}

export default RevenueController;