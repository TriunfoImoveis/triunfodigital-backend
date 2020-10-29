import IUserRepository from "@modules/users/repositories/IUserRepository";
import IRequestRankingDTO from "@modules/users/dtos/IRequestRankingDTO";
import User from "@modules/users/infra/typeorm/entities/User";


class RankingService {
  constructor(private usersRepository: IUserRepository) {}

  public async execute({ city }: IRequestRankingDTO): Promise<User[]> {
    const usersForCity = await this.usersRepository.findForCity({
      city,
    });

    await Promise.all(
      usersForCity.map(
        async (user) => this.usersRepository.ranking(user.id),
      ),
    );

    return usersForCity;
  }
}

export default RankingService;
