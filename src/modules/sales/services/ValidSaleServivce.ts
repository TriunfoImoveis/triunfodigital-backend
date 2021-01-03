import AppError from '@shared/errors/AppError';
import ISaleRepository from '@modules/sales/repositories/ISaleRepository';
import { Status } from '@modules/sales/infra/typeorm/entities/Sale';

class ValidSaleService {
  constructor(
    private salesRepository: ISaleRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const sale = await this.salesRepository.findById(id);
  
    if (!sale) {
      throw new AppError("Venda não existe.", 404);
    } else if (sale.status !== Status.NV) {
      throw new AppError("Venda já validada.", 400);
    }
    
    if (!sale.installments.length) {
      throw new AppError("Venda não contem parcelas, adicione parcelas antes de validar.", 400);
    }

    if (sale.installments.length === 1) {
      var status = Status.PT;
    } else {
      var status = Status.PE;
    }

    await this.salesRepository.validSale(id, status);
  }
}

export default ValidSaleService;
