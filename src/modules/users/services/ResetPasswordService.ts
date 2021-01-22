import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";

import IUserRepository from "@modules/users/repositories/IUserRepository";
import AppError from "@shared/errors/AppError";
import IUserTokenRepository from "@modules/users/repositories/IUserTokenRepository";

interface IRequest {
  token: string;
  new_password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokenRepository,
  ) {}

  public async execute({token, new_password}: IRequest): Promise<void> {
    const userTokenExists = await this.userTokensRepository.findByToken(token);
    if (!userTokenExists) {
      throw new AppError("Token de usuário não existe.", 404);
    }
    
    const {id} = userTokenExists.user_id;
    const userExists = await this.usersRepository.findById(id);
    if (!userExists) {
      throw new AppError("Usuário não existe.", 404);
    }
    
    const hashedPassword = await hash(new_password, 8);
    await this.usersRepository.update(userExists.id, {password: hashedPassword});
  }
}

export default ResetPasswordService;