import { inject, injectable } from "tsyringe";
import { isToday } from "date-fns";

import IUserRepository from "@modules/users/repositories/IUserRepository";
import AppError from "@shared/errors/AppError";
import IUserTokenRepository from "@modules/users/repositories/IUserTokenRepository";

@injectable()
class ValidationEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokenRepository,
  ) {}

  public async execute(token: string): Promise<void> {
    const userTokenExists = await this.userTokensRepository.findByToken(token);
    if (!userTokenExists) {
      throw new AppError("Token inválido ou não existe.", 404);
    }

    if (!isToday(userTokenExists.created_at)) {
      throw new AppError("O token expirou, solicite outro e tente novamente.", 401);
    }
    
    const {user_id} = userTokenExists;
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError("Usuário não existe.", 404);
    }
    
    await this.usersRepository.update(user.id, {validated_account: true});

    await this.userTokensRepository.delete(userTokenExists.token);
  }
}

export default ValidationEmailService;