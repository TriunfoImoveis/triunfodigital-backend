import { add } from "date-fns";

import ISaleRepository from "@modules/sales/repositories/ISaleRepository";
import ICreateSaleUsedDTO from "@modules/sales/dtos/ICreateSaleUsedDTO";
import AppError from "@shared/errors/AppError";
import Sale from "@modules/sales/infra/typeorm/entities/Sale";
import ICreateInstallmentDTO from "@modules/sales/dtos/ICreateInstallmentDTO";

class CreateSaleUsedService {
  constructor(private saleRepository: ISaleRepository) {}

  public async execute({
    sale_type,
    sale_date,
    realty_ammount,
    percentage_sale,
    commission,
    bonus,
    origin,
    payment_type,
    realty,
    client_buyer,
    client_seller,
    user_coordinator,
    users_captivators,
    users_directors,
    users_sellers,
    value_signal,
    pay_date_signal,
  }: ICreateSaleUsedDTO, installments: ICreateInstallmentDTO[]): Promise<Sale> {

    var totalValueInstallments = 0;
    installments.map(
      (installment) => {
        installment.due_date = add(
          installment.due_date, 
          {hours: 3}
        )
        totalValueInstallments += Number(installment.value);
      }
    );
    // Comparar o total das parcelas com o valor da comissão.
    if (totalValueInstallments > commission) {
      throw new AppError(
        "O valor total das parcelas não pode ser maior que o valor da comissão.",
        400
      );
    }

    const ajusted_date = add(sale_date, {hours: 3});
    const ajusted_date_signal = add(pay_date_signal, {hours: 3});

    const sale = await this.saleRepository.createSaleUsed({
      sale_type,
      sale_date: ajusted_date,
      realty_ammount,
      percentage_sale,
      commission,
      bonus,
      origin,
      payment_type,
      realty,
      client_buyer,
      client_seller,
      user_coordinator,
      users_directors,
      users_captivators,
      users_sellers,
      value_signal,
      pay_date_signal: ajusted_date_signal,
    }, installments);

    if (!sale) {
      throw new AppError(
        "Erro durante a criação da venda, ckeck seus dados e tente novamente.",
        400
      );
    }

    return sale;
  }
}

export default CreateSaleUsedService;
