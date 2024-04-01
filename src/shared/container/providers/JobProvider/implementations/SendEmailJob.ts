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
    const {
      to_users,
      subject,
      file,
      variables,
    } = data;
    let listEmails: string[] = [];
    to_users.forEach(user => {
      if (user.validated_account) {
        listEmails.push(user.email);
      }
    });

    if (listEmails.length > 0) {
      const { nameDefault, emailDefault } = mailConfig.defaults.from;
      await this.mailProvider.sendMail({
        from: {
          name: nameDefault,
          email: emailDefault,
        },
        to: listEmails.toString(),
        subject: subject,
        templateData: {
          file: file,
          variables: variables,
        }
      });
    }
  }
}

export default SendEmailJob;
