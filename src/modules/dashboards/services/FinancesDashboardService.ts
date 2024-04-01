import { inject, injectable } from 'tsyringe';

import IInstallmentRepository from '@modules/finances/repositories/IInstallmentRepository';
import { IRequestDashboardFinancesDTO } from '../dtos/IRequestDashboardFinancesDTO';
import { StatusInstallment } from '@modules/finances/infra/typeorm/entities/Installment';
import { ParticipantType } from '@modules/finances/infra/typeorm/entities/Comission';
import { Comercial, IResponseDashboardFinancesDTO } from '@modules/finances/dtos/IResponseDashboardFinancesDTO';
import DivisionTypeRepository from '@modules/finances/infra/typeorm/repositories/DivisionTypeRepository';
import { generateBruteValue, generateDivisionValue, generateLiquidValue } from '@shared/utils/dashboard_utils';

@injectable()
class FinancesDashboardService {
  constructor(
    @inject('InstallmentsRepository')
    private installmetsRepository: IInstallmentRepository,


  ) {}


  public async execute(data: IRequestDashboardFinancesDTO): Promise<IResponseDashboardFinancesDTO> {

    let sellerPayedBrute = 0;
    let sellerPayedLiquid = 0;
    let captvatorPayedBrute = 0;
    let captvatorPayedLiquid = 0;
    let cooordinatorPayedBrute = 0;
    let cooordinatorPayedLiquid = 0;
    let directorPayedBrute = 0;
    let directorPayedLiquid = 0;
    let subsidiryPayedBrute = 0;
    let subsidiryPayedLiquid = 0;

    let tax = 0;

    const {subsidiary, dateFrom, dateTo, month, year} = data;
    const allInstallments = await this.installmetsRepository.listAllInstallments({
      subsidiariesIds: subsidiary ? [subsidiary] : undefined,
      status: StatusInstallment.LIQ,
      dateFrom,
      dateTo,
      month,
      year
    });
    const divisionTypeRepository = new DivisionTypeRepository()

    const divisionsType = await divisionTypeRepository.findAll();

    const divisons = divisionsType.map((division) => {
      return {
        id: division.id,
        name: division.name,
        value: generateDivisionValue(allInstallments, division.id)
      }
    })

    allInstallments.forEach((installment) => {

      // valor total de comissioes bruto e liquido (VENDEDOR)
      const comissionSellerBurute = generateBruteValue({installment, type: ParticipantType.VEN})
      const comissionSellerLiquid = generateLiquidValue({installment, type: ParticipantType.VEN})

      sellerPayedBrute += comissionSellerBurute;
      sellerPayedLiquid += comissionSellerLiquid;
      // valor total de comissioes bruto e liquido (CAPTADOR)
      const comissionCaptvatorBurute = generateBruteValue({installment, type: ParticipantType.CAP})
      const comissionCaptvatorLiquid = generateLiquidValue({installment, type: ParticipantType.CAP})

      captvatorPayedBrute += comissionCaptvatorBurute;
      captvatorPayedLiquid += comissionCaptvatorLiquid;
      // valor total de comissioes bruto e liquido (COOORDINADOR)
      const comissionCoordinatorBurute = generateBruteValue({installment, type: ParticipantType.COO})
      const comissionCoordinatorLiquid = generateLiquidValue({installment, type: ParticipantType.COO})

      cooordinatorPayedBrute += comissionCoordinatorBurute;
      cooordinatorPayedLiquid += comissionCoordinatorLiquid;
      // valor total de comissioes bruto e liquido (Diretor)
      const comissionDirectorBurute = generateBruteValue({installment, type: ParticipantType.DIR})
      const comissionDirectorLiquid = generateLiquidValue({installment, type: ParticipantType.DIR})

      directorPayedBrute += comissionDirectorBurute;
      directorPayedLiquid += comissionDirectorLiquid;
      // valor total de comissioes bruto e liquido (Diretor)
      const comissionSubsidiaryBurute = generateBruteValue({installment, type: ParticipantType.EMP})
      const comissionSubsidiaryLiquid = generateLiquidValue({installment, type: ParticipantType.EMP})

      subsidiryPayedBrute += comissionSubsidiaryBurute;
      subsidiryPayedLiquid += comissionSubsidiaryLiquid;

      // Pega o imposto de todas as comissoes
    tax = installment.calculation.note_value ? Number(installment.calculation.note_value) + tax : tax + 0;
    });

    const comercial: Comercial = {
      seller: {
        brute: sellerPayedBrute,
        liquid: sellerPayedLiquid
      },
      captivator: {
        brute: captvatorPayedBrute,
        liquid: captvatorPayedLiquid
      },
      coordinator: {
        brute: cooordinatorPayedBrute,
        liquid: cooordinatorPayedLiquid
      },
      director: {
        brute: directorPayedBrute,
        liquid: directorPayedLiquid
      },
      subsidiary: {
        brute: subsidiryPayedBrute,
        liquid: subsidiryPayedLiquid
      }
    }

    return {comercial, tax, divisions: divisons};
  }
}

export default FinancesDashboardService;
