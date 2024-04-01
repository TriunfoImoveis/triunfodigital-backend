import {Request, Response} from 'express';
import { container } from 'tsyringe';

import CreateInstallmentService from '@modules/finances/services/CreateInstallmentService';
import UpdateInstallmentService from '@modules/finances/services/UpdateInstallmentService';
import ListInstallmentService from '@modules/finances/services/ListInstallmentService';
import ShowInstallmentService from '@modules/finances/services/ShowInstallmentService';
import ExportCommissionService from '@modules/finances/services/ExportCommissionService';
import { StatusInstallment } from '@modules/finances/infra/typeorm/entities/Installment';
import AppError from '@shared/errors/AppError';
import InstallmentsEntryService from '@modules/finances/services/InstallmentsEntryService';
import { verifyDates } from '@shared/utils/verify_dates';

interface InstallmentRequestQuery {
  buyer_name?: string;
  subsidiary?: string;
  status?: string;
  month?: string;
  year?: string;
  dateFrom?: Date;
  dateTo?: Date;
  page?: number;
  perPage?: number;
  sort?: 'ASC' | 'DESC';
}

class InstallmentController {
  async list(
    request: Request<never, never, never, InstallmentRequestQuery>,
    response: Response
  ): Promise<Response> {
    const {
      buyer_name,
      subsidiary,
      status,
      month,
      year,
      dateFrom,
      dateTo,
      page,
      perPage
    } = request.query;

    if (status) {
      const statusInstallments = Object.values(StatusInstallment);
      const statusRequest = status.split(',') as StatusInstallment[];
      const isValidateStatus = statusRequest.every(status => statusInstallments.includes(status));

      if (!isValidateStatus) {
        throw new AppError(`Invalid status: status must be ${statusInstallments.join(', ')}`, 400);
      }
    }

    const validadeDates = verifyDates(dateFrom, dateTo);

    if (validadeDates.error) {
      throw new AppError(validadeDates.errorMessage, 400);
    }


    const listInstallmentService = container.resolve(ListInstallmentService);
    const listInstallments = await listInstallmentService.execute({
      buyer_name,
      subsidiary,
      status: status ? status.split(',') as StatusInstallment[] : undefined,
      month,
      year,
      dateFrom,
      dateTo,
      page,
      perPage
    });

    return response.json(listInstallments);
  }

  async getEntry(
    request: Request<never, never, never, InstallmentRequestQuery>,
    response: Response
  ): Promise<Response> {
    const {
      buyer_name,
      subsidiary,
      month,
      year,
      dateFrom,
      dateTo,
      page,
      perPage,
      sort
    } = request.query;

    const validadeDates = verifyDates(dateFrom, dateTo);

    if (validadeDates.error) {
      throw new AppError(validadeDates.errorMessage, 400);
    }

    const installmentsEntryService = container.resolve(InstallmentsEntryService);
    const installmentsEntry = await installmentsEntryService.execute({
      buyer_name,
      subsidiary,
      month,
      year,
      dateFrom,
      dateTo,
      page,
      perPage,
      sort
    });

    return response.json(installmentsEntry);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const showInstallmentService = container.resolve(ShowInstallmentService);
    const installment = await showInstallmentService.execute(request.params.id);

    return response.json(installment);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const createInstallmentService = container.resolve(CreateInstallmentService);
    const listInstallment = await createInstallmentService.execute({
      id: request.params.id,
      installments: request.body.installments
    });

    return response.json(listInstallment);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const updateInstallmentService = container.resolve(UpdateInstallmentService);
    await updateInstallmentService.execute(
      request.params.id
    );

    return response.status(200).send();
  }

  async exportExcel(request: Request, response: Response): Promise<Response> {
    const exportCommissionService = container.resolve(ExportCommissionService);
    const filePath = await exportCommissionService.execute();

    return response.json(filePath).status(201);
  }
}

export default InstallmentController;
