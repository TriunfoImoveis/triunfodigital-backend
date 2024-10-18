import UpdateBankDataService from '@modules/users/services/UpdateBankDataUserServicer';
import CreateBankDataService from '@modules/users/services/CreateBankDataUserServicer';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class BankDataController {

  async create(request: Request, response: Response): Promise<Response> {
    const {userId} = request.params;
    const createBankDataService = container.resolve(CreateBankDataService);

    const bankData = await createBankDataService.execute({bank: {
      ...request.body,
      user: userId
    }})
    return response.json(classToClass(bankData));
  }

  async update(request: Request, response: Response): Promise<Response> {
    const {userId = "", bankDataId = ""} = request.params;
    const updateBankDataService = container.resolve(UpdateBankDataService);

    const bankData = await updateBankDataService.execute({bank: {
      id: bankDataId,
      ...request.body,
      user: userId
    }})
    return response.json(classToClass(bankData));
  }
}

export default BankDataController;
