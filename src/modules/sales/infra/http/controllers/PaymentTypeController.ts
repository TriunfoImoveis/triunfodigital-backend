import { Request, Response } from "express";

import AppError from "@shared/errors/AppError";
import PaymentTypeRepository from "@modules/sales/infra/typeorm/repositories/PaymentTypeRepository";

class PaymentTypeController {
  async index(request: Request, response: Response): Promise<Response> {
    const { type } = request.query;

    if (typeof type !== "string") {
      throw new AppError('Type not is valid string.');
    }

    const paymentTypeRepository = new PaymentTypeRepository();
    const payment_types = await paymentTypeRepository.findNewOrUsed(type);

    return response.json(payment_types);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { type, name } = request.body;
    const paymentTypeRepository = new PaymentTypeRepository();
    const new_payment_type = await paymentTypeRepository.create({
      type,
      name,
    });

    return response.json(new_payment_type);
  }
}

export default PaymentTypeController;
