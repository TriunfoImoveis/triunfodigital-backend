import { getMongoRepository, MongoRepository } from "typeorm";

import IUserTokenRepository from "@modules/users/repositories/IUserTokenRepository";
import UserToken from "@modules/users/infra/typeorm/schemas/UserToken";
import AppError from "@shared/errors/AppError";
import ICreateUserTokenDTO from "@modules/users/dtos/ICreateUserTokenDTO";

class UserTokensRepository implements IUserTokenRepository {
  private ormRepository: MongoRepository<UserToken>;

  constructor() {
    this.ormRepository = getMongoRepository(UserToken, 'mongo');
  }

  async create(data: ICreateUserTokenDTO): Promise<UserToken> {
    try {
      const tokenInstance = this.ormRepository.create(data);
      const tokenCreated = await this.ormRepository.save(tokenInstance);

      return tokenCreated;
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

  async delete(token: string): Promise<void> {
    try {
      await this.ormRepository.delete({token});
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default UserTokensRepository;