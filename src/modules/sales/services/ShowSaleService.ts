import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ISaleRepository from '@modules/sales/repositories/ISaleRepository';
import Sale from '@modules/sales/infra/typeorm/entities/Sale';

interface IRequestDTO {
  id: string;
}

@injectable()
class ShowSaleService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISaleRepository,
  ) {}

  public async execute({ id }: IRequestDTO): Promise<Sale> {
    const sale = await this.salesRepository.findById(id);

    if (!sale) {
      throw new AppError("Venda não existe.", 404);
    }

    return sale;
  }
}

export default ShowSaleService;
