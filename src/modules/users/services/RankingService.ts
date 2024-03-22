import { inject, injectable } from "tsyringe";
import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from "@modules/users/repositories/IUserRepository";
import IResponseRankingDTO from "@modules/users/dtos/IResponseRankingDTO";
import ISaleRepository from "@modules/sales/repositories/ISaleRepository";
import AppError from "@shared/errors/AppError";
import { getRanking } from "@shared/utils/get_ranking";

interface IRequestRankingDTO {
  year?: string;
  month?: string;
  subsidiary?: string;
  office: 'Corretor' | 'Coordenador' | 'Diretor';
  typeRanking: 'sales' | 'captivator' | 'coordinator';
}

@injectable()
class RankingService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('SalesRepository')
    private salesRepository: ISaleRepository,
  ) { }

  public async execute({
    year,
    month,
    subsidiary,
    office,
    typeRanking
  }: IRequestRankingDTO): Promise<IResponseRankingDTO[]> {

    let users: User[] = []

    if (office === 'Corretor') {
      const [realtors, coordinators] = await Promise.all([
        this.usersRepository.findUsers({
          subsidiary,
          office: 'Corretor',
          departament: 'Comercial'
        }),
        this.usersRepository.findUsers({
          subsidiary,
          office: 'Coordenador',
          departament: 'Comercial'
        })
      ])

      users = [...realtors, ...coordinators]
    } else {
      users = await this.usersRepository.findUsers({
        subsidiary,
        office: office,
        departament: 'Comercial'
      })
    }




    // // Gera o ranking e VGV de cada usuário (Corretores ou captadores)
    let ranking: IResponseRankingDTO[] = [];

    if (users.length === 0) {
      return ranking
    }

    if (typeRanking === 'coordinator') {
      // Gerar ranking de Coordenadores
      const userIds = users.map(user => user.id);
      const sales = await this.salesRepository.salesForUserCoordinators({
        ids: userIds,
        month,
        year
      })

      // Calcula o vgv de cada coordenador

      ranking = getRanking(users, sales, typeRanking);
    }
    if (typeRanking === 'sales') {
      const userIds = users.map(user => user.id);
      const sales = await this.salesRepository.salesForUserSellers({
        ids: userIds,
        month,
        year
      })

      ranking = getRanking(users, sales, typeRanking);
    }
    if (typeRanking === 'captivator') {
      const userIds = users.map(user => user.id);
      const sales = await this.salesRepository.salesForUserCaptivators({
        ids: userIds,
        month,
        year
      })

      ranking = getRanking(users, sales, typeRanking);
    }

    // Ordena o ranking do maior VGV para o menor
    ranking.sort((a ,b) => {
      return b.vgv - a.vgv;
    });

    return ranking;
  }
}

export default RankingService;
