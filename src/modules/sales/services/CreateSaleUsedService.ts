import { container, inject, injectable } from "tsyringe";
import { add, format } from "date-fns";
import path from 'path';

import ISaleRepository from "@modules/sales/repositories/ISaleRepository";
import ICreateSaleUsedDTO from "@modules/sales/dtos/ICreateSaleUsedDTO";
import AppError from "@shared/errors/AppError";
import Sale from "@modules/sales/infra/typeorm/entities/Sale";
import ICreateInstallmentDTO from "@modules/finances/dtos/ICreateInstallmentDTO";
import CreateNotificationService from "@modules/notifications/services/CreateNotificationService";
import IUserRepository from "@modules/users/repositories/IUserRepository";
import SendEmailSaleService from "./SendEmailSaleService";
import SendEmailJob from "@shared/container/providers/JobProvider/implementations/SendEmailJob";

@injectable()
class CreateSaleUsedService {
  constructor(
    @inject('SalesRepository')
    private saleRepository: ISaleRepository,

    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

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
    observation,
    subsidiary
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
      observation,
      subsidiary
    }, installments);

    if (sale) {
      // Criar notificação.
      const saleRegister = await this.saleRepository.findById(sale.id);
      if (saleRegister) {
        // const createNotificationService = container.resolve(CreateNotificationService);
        // await createNotificationService.execute({
        //   content: "Venda de imóvel USADO cadastrada.",
        //   sale_id: sale.id,
        //   type: 'CREATE',
        // });

        // Enviar e-mail para o Financeiro.
        const users = await this.usersRepository.findUsers({
          office: 'Gerente',
        });

        // Só envia os e-mails se houver usuário Gerente.
        if (users.length > 0) {
          const nameSellers = saleRegister.sale_has_sellers.map(seller => {
            return seller.name;
          });

          const pathSaleTemplate = path.resolve(
            __dirname,
            '..',
            'views',
            'register_sale.hbs'
          );

          const sendEmailJob = container.resolve(SendEmailJob);
          await sendEmailJob.run({
            to_users: users,
            subject: "[Triunfo Digital] Nova Venda Cadastrada",
            file: pathSaleTemplate,
            variables: {
              type: sale.sale_type,
              date: format(sale.sale_date, 'dd/MM/yyyy'),
              enterprise: sale.realty.enterprise,
              value: sale.realty_ammount.toLocaleString(
                'pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }
              ),
              sellers: nameSellers,
            }
          });
        }
      }

      return sale;
    } else {
      throw new AppError(
        "Erro durante a criação da venda, ckeck seus dados e tente novamente.",
        400
      );
    }
  }
}

export default CreateSaleUsedService;
