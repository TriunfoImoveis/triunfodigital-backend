import UserToken from "@modules/users/infra/typeorm/schemas/UserToken";
import ICreateUserTokenDTO from "@modules/users/dtos/ICreateUserTokenDTO";

export default interface IUserTokenRepository {
  create(data: ICreateUserTokenDTO): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
  delete(token: string): Promise<void>;
}