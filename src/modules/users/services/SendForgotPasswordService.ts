import { inject, injectable } from "tsyringe";
import path from 'path';
import { uuid } from "uuidv4";

import IUserRepository from "@modules/users/repositories/IUserRepository";
import AppError from "@shared/errors/AppError";
import IUserTokenRepository from "@modules/users/repositories/IUserTokenRepository";
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";

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
  
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({email}: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Usuário não existe.", 404);
    }

    const {token} = await this.userTokensRepository.create({
      token: uuid(), 
      user_id: user.id
    });

    const pathForgotPasswordTemplate = path.resolve(
      __dirname, 
      '..', 
      'views',
      'forgot_password.hbs'
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      from: {
        name: "Equipe Triunfo Digital",
        email: "dev.triunfoimoveis@gmail.com",
      },
      subject: "[Triunfo Digital] Recuperação de Senha",
      templateData: {
        file: pathForgotPasswordTemplate,
        variables: {
          name: user.name,
          token,
        }
      }
    });
  }
}

export default SendForgotPasswordService;