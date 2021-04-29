import { Request, Response } from "express";
import { container } from "tsyringe";

import ListRevenueService from "@modules/finances/services/ListRevenueService";
import CreateRevenueService from "@modules/finances/services/CreateRevenueService";

class RevenueController {
  async list(request: Request, response: Response): Promise<Response> {
    const listRevenueService = container.resolve(ListRevenueService);
    const revenues = await listRevenueService.execute();
    return response.json(revenues);
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
}

export default RevenueController;