import { inject, injectable } from "tsyringe";
import path from 'path';
import { v4 } from "uuid";

import IUserRepository from "@modules/users/repositories/IUserRepository";
import AppError from "@shared/errors/AppError";
import IUserTokenRepository from "@modules/users/repositories/IUserTokenRepository";
import mailQueue from "@shared/container/providers/JobProvider/implementations/Queue";

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokenRepository,
  ) {}

  public async execute({email}: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Usuário não existe.", 404);
    }
    
    if (!user.validated_account) {
      throw new AppError(
        "E-mail de usuário não validada até o momento. Valide seu e-mail de acesso antes.", 
        403
      );
    }

    const {token} = await this.userTokensRepository.create({
      token: v4(), 
      user_id: user.id
    });

    const pathForgotPasswordTemplate = path.resolve(
      __dirname, 
      '..', 
      'views',
      'forgot_password.hbs'
    );

    // Adicionar job ForgotPasswordJob na fila
    await mailQueue.add('ForgotPasswordJob', {
      to_users: user.email,
      subject: "[Triunfo Digital] Recuperação de Senha",
      file: pathForgotPasswordTemplate,
      variables: {
        name: user.name,
        link: `${process.env.APP_WEB_URL}/password/reset/${token}`
      }
    });
  }
}

export default SendForgotPasswordService;