import { inject, injectable } from 'tsyringe';
import { format, isFuture, isPast, parseISO, toDate } from 'date-fns';
import path from 'path';

import IInstallmentRepository from '@modules/finances/repositories/IInstallmentRepository';
import { StatusInstallment } from '@modules/finances/infra/typeorm/entities/Installment';
import mailQueue from "@shared/container/providers/JobProvider/implementations/Queue";
import IUserRepository from '@modules/users/repositories/IUserRepository';

@injectable()
class CheckInstallmentService {
  constructor(
    @inject('InstallmentsRepository')
    private installmentsRepository: IInstallmentRepository,

    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute(): Promise<void> {

    const cities = ["Fortaleza", "São Luís", "Teresina"];

    const installmentsForCities = await Promise.all(
      cities.map(async (city) => {
        // Busca todas as pascelas pendentes em cada filial por vez.
        const installments = await this.installmentsRepository.list({
          buyer_name: '',
          city,
          status: StatusInstallment.PEN,
        });

        // Verifica cada parcela se está vencida e as retorna.
        const installmentsLate = installments.filter((installment) => {
          const dateFormated = parseISO(installment.due_date.toString());
          if (isPast(dateFormated)) {
            installment.status = StatusInstallment.VEN;
            return installment;
          }
        });

        // Só retorna se houver parcelas vencidas na filial.
        return {
          city,
          installmentsLate,
        }
      })
    );
    
    // Retorna true caso não exista parcelas vencidas em todas as filiais, caso contrario retona false.
    const checkInstallmentsAllCities = installmentsForCities.filter((installmentsForCity) => {
      if (installmentsForCity.installmentsLate.length > 0) {
        return installmentsForCity;
      }
    });
    
    // Verifica se existem parcelas vencidas em todas as filiais.
    if (checkInstallmentsAllCities.length > 0) {
      const users = await this.usersRepository.findUsers({
        city: '%',
        departament: '%',
        name: '%',
        office: 'Gerente',
      });

      // Só envia os e-mails se houver usuário Gerente.
      if (users.length > 0) {
        const pathInstallmentTemplate = path.resolve(
          __dirname, 
          '..', 
          'views',
          'installments_late.hbs'
        );

        const emails = users.map(user => {
          return user.email;
        });
        
        // Adicionar job ForgotPasswordJob na fila
        await mailQueue.add('CheckInstallmentJob', 
          {
            to_users: emails.toString(),
            subject: "[Triunfo Digital] Parcelas Vencidas",
            file: pathInstallmentTemplate,
            variables: {
              installmentsForCities
            }
          }
        );
      }
    }
  }
}

export default CheckInstallmentService;