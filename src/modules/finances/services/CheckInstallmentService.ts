import { container, inject, injectable } from 'tsyringe';
import { isPast, parseISO } from 'date-fns';
import path from 'path';

import IInstallmentRepository from '@modules/finances/repositories/IInstallmentRepository';
import { StatusInstallment } from '@modules/finances/infra/typeorm/entities/Installment';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import SendEmailJob from '@shared/container/providers/JobProvider/implementations/SendEmailJob';
import ISubsidiaryRepository from '@modules/organizations/repositories/ISubsidiaryRepository';

@injectable()
class CheckInstallmentService {
  constructor(
    @inject('InstallmentsRepository')
    private installmentsRepository: IInstallmentRepository,

    @inject('SubsidiariesRepository')
    private subsidiariesRepository: ISubsidiaryRepository,

    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) { }

  public async execute(): Promise<void> {

    const subsidiaries = await this.subsidiariesRepository.findSubsidiarysActive();
    const subsidiariesIds = subsidiaries.map(subsidiary => subsidiary.id);

    const pendingInstallments = await this.installmentsRepository.listAllInstallments({ subsidiariesIds, status: StatusInstallment.PEN })

    const hasPendingInstallments = pendingInstallments.length > 0;
    if (hasPendingInstallments) {
      const overduePendingInstallments = pendingInstallments.filter((installment) => {
        const dateFormated = parseISO(installment.due_date.toString());
        if (isPast(dateFormated)) {
          return installment;
        }
      })

      const hasOverduePendingInstallments = overduePendingInstallments.length > 0;
      if (hasOverduePendingInstallments) {
        const overduePendingInstallmentsIds = overduePendingInstallments.map(installment => installment.id);
        await this.installmentsRepository.updateMultipleInstallments(overduePendingInstallmentsIds, { status: StatusInstallment.VEN });
      }

    }

    const overdueInstallments = await this.installmentsRepository.listAllInstallments({ subsidiariesIds, status: StatusInstallment.VEN })
      .then(installments => installments.map(installment => {
        return {
          subsidiary: installment.sale.subsidiary,
          city: installment.sale.subsidiary.city,
          installment
        }
      }))


    const hasOverdueInstallments = overdueInstallments.length > 0;

    if (hasOverdueInstallments) {
      const managers = await this.usersRepository.findUsers({
        office: 'Gerente',
      });


      const hasManager = managers.length > 0;
      if (hasManager) {
        const pathInstallmentTemplate = path.resolve(
          __dirname,
          '..',
          'views',
          'installments_late.hbs'
        );

        const sendEmailJob = container.resolve(SendEmailJob);
        await sendEmailJob.run({
          to_users: managers,
          subject: "[Triunfo Digital] Parcelas Vencidas",
          file: pathInstallmentTemplate,
          variables: {
            overdueInstallments
          }
        });
      }
    }
  }
}

export default CheckInstallmentService;
