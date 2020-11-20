import IUserRepository from "@modules/users/repositories/IUserRepository";
import IRequestRankingDTO from "@modules/users/dtos/IRequestRankingDTO";
import IResponseRankingDTO from "@modules/users/dtos/IResponseRankingDTO";
import ISaleRepository from "@modules/sales/repositories/ISaleRepository";


class RankingService {
  constructor(
    private usersRepository: IUserRepository,
    private salesRepository: ISaleRepository,
  ) {}

  public async execute({
    city,
    month,
    year,
  }: IRequestRankingDTO): Promise<IResponseRankingDTO[]> {
    const office = "Corretor";
    const usersForCity = await this.usersRepository.findUserForCityAndOffice(city, office);

    let ranking: IResponseRankingDTO[];

    ranking = await Promise.all(
      usersForCity.map(async (user) => {
        let vgv = 0;

        if (month) {
          var sales = await this.salesRepository.salesForUserAndMonthAndYear(user.id, month, year);
        } else {
          var sales = await this.salesRepository.salesForUserAndYear(user.id, year);
        }

        await Promise.all(
          sales.map(async (sale) => {

            const quantitySale = await this.usersRepository.quantitySellers(sale.id);
            const partialSale = sale.realty_ammount/quantitySale;
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

    ranking.sort((a ,b) => {
      return b.vgv - a.vgv;
    });

    return ranking;
  }
}

export default RankingService;
