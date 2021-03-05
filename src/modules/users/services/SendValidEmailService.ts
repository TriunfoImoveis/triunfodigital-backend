import { inject, injectable } from "tsyringe";
import path from 'path';
import { v4 } from "uuid";

import IUserRepository from "@modules/users/repositories/IUserRepository";
import AppError from "@shared/errors/AppError";
import IUserTokenRepository from "@modules/users/repositories/IUserTokenRepository";
import mailQueue from "@shared/container/providers/JobProvider/implementations/Queue";

@injectable()
class SendValidEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokenRepository,
  ) {}

  public async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Usuário não existe.", 404);
    }

    const {token} = await this.userTokensRepository.create({
      token: v4(), 
      user_id: user.id
    });

    const pathValidEmailTemplate = path.resolve(
      __dirname, 
      '..', 
      'views',
      'valid_email.hbs'
    );

    // Adicionar job ConfirmationUserEmailJob na fila
    await mailQueue.add('ConfirmationUserEmailJob', {
      to_users: user.email,
      subject: "[Triunfo Digital] Validação de E-mail",
      file: pathValidEmailTemplate,
      variables: {
        name: user.name,
        link: `${process.env.APP_WEB_URL}/valid-email/${token}`,
      }
    });
  }
}

export default SendValidEmailService;