import { inject, injectable } from "tsyringe";
import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from "@modules/users/repositories/IUserRepository";
import IResponseRankingDTO from "@modules/users/dtos/IResponseRankingDTO";
import ISaleRepository from "@modules/sales/repositories/ISaleRepository";
import AppError from "@shared/errors/AppError";

interface IRequestRankingDTO {
  year?: string;
  month?: string;
  subsidiary: string;
  user: string;
}

@injectable()
class RankingService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('SalesRepository')
    private salesRepository: ISaleRepository,
  ) {}

  public async execute({
    year,
    month,
    subsidiary,
    user,
  }: IRequestRankingDTO): Promise<IResponseRankingDTO[]> {

    let usersSellers: User[] = []
    let usersCoordinators: User[] = []

    if (!subsidiary || subsidiary === "all") {
      const [realtors, coordinators] = await Promise.all([
        this.usersRepository.findUsersRealtors(),
        this.usersRepository.findUsersCoordinators()
      ])

      if (!realtors ) {
        new AppError('error on find users')
      }
      if (!coordinators ) {
        new AppError('error on find users')
      }

      usersSellers = realtors ? realtors : []
      usersCoordinators = coordinators ? coordinators : []
    } else {
      usersSellers = await this.usersRepository.findUsersRealtorsBySubsidiary(subsidiary) || []
      usersCoordinators = await this.usersRepository.findUsersCoordinatorsBySubsidiary(subsidiary) || []
    }

    var users = usersSellers.concat(usersCoordinators);

    // Gera o ranking e VGV de cada usuário (Corretores ou captadores)
    var ranking: IResponseRankingDTO[];
    if (user === "Captador") {
      // Gerar ranking de Corretores Captadores
      ranking = await Promise.all(
        users.map(async (user) => {
          const sales = await this.salesRepository.salesForUserCaptivators({
            id: user.id,
            year: year !== 'all' ? year : '',
            month : month !== 'all' ? month : '',
          });

          let vgv = 0;
          await Promise.all(
            sales.map(async (sale) => {

              const quantity = await this.usersRepository.quantityCaptivators(sale.id);
              const partialSale = sale.realty_ammount/quantity;
              vgv += partialSale;

            })
          );

          return {
            id: user.id,
            avatar: user.avatar,
            avatar_url: user.getAvatarUrl(),
            name: user.name,
            vgv: Number(vgv.toFixed(2)),
          };
        }),
      );
    } else {
      // Gerar ranking de Corretores Vendedores
      ranking = await Promise.all(
        users.map(async (user) => {
          const sales = await this.salesRepository.salesForUserSellers({
            id: user.id,
            year: year !== 'all' ? year : '',
            month : month !== 'all' ? month : '',
          });
          let vgv = 0;
          await Promise.all(
            sales.map(async (sale) => {

              const quantity = await this.usersRepository.quantitySellers(sale.id);
              const partialSale = sale.realty_ammount/quantity;
              vgv += partialSale;

            })
          );

          return {
            id: user.id,
            avatar: user.avatar,
            avatar_url: user.getAvatarUrl(),
            name: user.name,
            vgv: Number(vgv.toFixed(2)),
          };
        }),
      );
    }

    // Ordena o ranking do maior VGV para o menor
    ranking.sort((a ,b) => {
      return b.vgv - a.vgv;
    });

    return ranking;
  }
}

export default RankingService;
