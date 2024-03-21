import { inject, injectable } from "tsyringe";
import { format, getMonth, getYear } from "date-fns";

import IUserRepository from "@modules/users/repositories/IUserRepository";
import IResponseRankingDTO from "@modules/users/dtos/IResponseRankingDTO";
import ISaleRepository from "@modules/sales/repositories/ISaleRepository";

interface IRequestRankingDTO {
  year: number;
  month?: number;
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
    // Pega a data atual e o formato Ano e Mês juntos para filtrar as vendas
    var date = year.toString();

    if (month !== undefined) {
      let monthFormated = month.toString();
      if ((month >= 1) && (month <= 9)) {
        monthFormated = `0${monthFormated}`;
      }
      var format_date = "yyyyMM";
      var dateFormated = date + monthFormated;
    } else {
      var format_date = "yyyy";
      var dateFormated = date;
    }

    // Busca usuarios Corretores
    const usersSellers = await this.usersRepository.findUsers({
      subsidiary,
      office: "Corretor",
      departament: "%",
      name: "%"
    });

    // Busca usuarios Coordenadores
    const usersCoordinators = await this.usersRepository.findUsers({
      subsidiary,
      office: "Coordenador",
      departament: "%",
      name: "%"
    });

    var users = usersSellers.concat(usersCoordinators);

    // Gera o ranking e VGV de cada usuário (Corretores ou captadores)
    var ranking: IResponseRankingDTO[];
    if (user === "Captador") {
      // Gerar ranking de Corretores Captadores
      ranking = await Promise.all(
        users.map(async (user) => {
          const sales = await this.salesRepository.salesForUserCaptivators(user.id, format_date, dateFormated);

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
          const sales = await this.salesRepository.salesForUserSellers(user.id, format_date, dateFormated);

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
