import { Request, Response } from "express";
import { container } from "tsyringe";

import ListRevenueService from "@modules/finances/services/ListRevenueService";
import CreateRevenueService from "@modules/finances/services/CreateRevenueService";
import UpdateRevenueService from "@modules/finances/services/UpdateRevenueService";
import ShowRevenueService from "@modules/finances/services/ShowRevenueService";
import PaidRevenueService from "@modules/finances/services/PaidRevenueService";
import ExportRevenueService from "@modules/finances/services/ExportRevenueService";
import { RevenueStatus, RevenueType } from "../../typeorm/entities/Revenue";
import AppError from "@shared/errors/AppError";

interface RevenueRequestQuery {
  subsidiary?: string;
  revenue_type: RevenueType;
  status?: string;
  month?: string;
  year?: string;
  dateFrom?: Date;
  dateTo?: Date;
  page?: number;
  perPage?: number;
  sort?: 'ASC' | 'DESC';
}
class RevenueController {
  async list(request: Request<never, never, never, RevenueRequestQuery>, response: Response): Promise<Response> {
    const { status } = request.query;
    if (status) {
      const statusRevenue = Object.values(RevenueStatus);
      const statusRequest = status.split(',') as RevenueStatus[];
      const isValidateStatus = statusRequest.every(status => statusRevenue.includes(status));

      if (!isValidateStatus) {
        throw new AppError(`Invalid status: status must be ${statusRevenue.join(', ')}`, 400);
      }
    }
    const listRevenueService = container.resolve(ListRevenueService);
    const revenues = await listRevenueService.execute({
      ...request.query,
      status: status ? status.split(',') as RevenueStatus[] : undefined,
    });
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

  async exportExcel(request: Request, response: Response): Promise<Response> {
    const exportRevenueService = container.resolve(ExportRevenueService);
    const filePath = await exportRevenueService.execute();
    return response.json(filePath).status(201);
  }
}

export default RevenueController;
