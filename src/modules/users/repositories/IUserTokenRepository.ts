import UserToken from "@modules/users/infra/typeorm/entities/UserToken";
import User from "@modules/users/infra/typeorm/entities/User";

export default interface IUserTokenRepository {
  generate(user: User): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
}