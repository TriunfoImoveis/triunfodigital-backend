import { inject, injectable } from "tsyringe";
import path from 'path';

import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import mailConfig from "@config/mail";
import User from "@modules/users/infra/typeorm/entities/User";

interface IRequestDTO {
  to_users: User[];
  subject: string;
  file: string;
  variables: {
    [key: string]: string | string[] | number;
  }
}

@injectable()
class SendEmailSaleService {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({subject, file, to_users, variables}: IRequestDTO): Promise<void> {
    let listEmails: string[] = [];
    to_users.forEach(user => {
      if (user.validated_account) {
        listEmails.push(user.email);
      }
    });

    if (listEmails.length > 0) {
      const emails = listEmails.toLocaleString();
      const pathValidEmailTemplate = path.resolve(
        __dirname, 
        '..', 
        'views',
        file
      );
      
      const {nameDefault, emailDefault} = mailConfig.defaults.from;
      await this.mailProvider.sendMail({
        from: {
          name: nameDefault,
          email: emailDefault,
        },
        to: emails,
        subject,
        templateData: {
          file: pathValidEmailTemplate,
          variables
        }
      });
    }
  }
}

export default SendEmailSaleService;