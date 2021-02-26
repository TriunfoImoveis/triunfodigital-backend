import { inject, injectable } from "tsyringe";

import mailConfig from '@config/mail';
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import ISendEmailJobDTO from "@shared/container/providers/JobProvider/dtos/ISendEmailJobDTO";

@injectable()
class SendEmailJob {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async run(data: ISendEmailJobDTO): Promise<void> {
    const { nameDefault, emailDefault } = mailConfig.defaults.from;
    await this.mailProvider.sendMail({
      from: {
        name: nameDefault,
        email: emailDefault,
      },
      to: data.to_users,
      subject: data.subject,
      templateData: {
        file: data.file,
        variables: data.variables,
      }
    });
  }
}

export default SendEmailJob;