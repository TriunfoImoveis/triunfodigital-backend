import { getRepository, Repository } from "typeorm";

import IUserTokenRepository from "@modules/users/repositories/IUserTokenRepository";
import UserToken from "@modules/users/infra/typeorm/entities/UserToken";
import AppError from "@shared/errors/AppError";
import User from "@modules/users/infra/typeorm/entities/User";

class UserTokensRepository implements IUserTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  async generate(user: User): Promise<UserToken> {
    try {
      const token = this.ormRepository.create({user_id: user});
      const tokenGenerated = await this.ormRepository.save(token);

      return tokenGenerated;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findByToken(token: string): Promise<UserToken | undefined> {
    try {
      const userToken = await this.ormRepository.findOne({
        where: {token}
      });

      return userToken;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default UserTokensRepository;