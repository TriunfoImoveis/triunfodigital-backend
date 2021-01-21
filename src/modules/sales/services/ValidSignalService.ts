import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ISaleRepository from '@modules/sales/repositories/ISaleRepository';

@injectable()
class ValidSignalService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISaleRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const sale = await this.salesRepository.findById(id);

    if (!sale) {
      throw new AppError("Venda não existe.", 404);
    }
    const status: Boolean = true;
    await this.salesRepository.validSignal(id, status);
  }
}

export default ValidSignalService;
