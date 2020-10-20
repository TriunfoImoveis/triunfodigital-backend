import { Request, Response } from "express";

import PaymentTypeRepository from "@modules/sales/infra/typeorm/repositories/PaymentTypeRepository";

class PaymentTypeController {
  async listNew(request: Request, response: Response): Promise<Response> {
    const paymentTypeRepository = new PaymentTypeRepository();
    const payment_types = await paymentTypeRepository.findNew();

    return response.json(payment_types);
  }

  async listUsed(request: Request, response: Response): Promise<Response> {
    const paymentTypeRepository = new PaymentTypeRepository();
    const payment_types = await paymentTypeRepository.findUsed();

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
