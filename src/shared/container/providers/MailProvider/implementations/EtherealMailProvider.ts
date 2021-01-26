import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';

import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import ISendMailDTO from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import AppError from '@shared/errors/AppError';

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      });

      this.client = transporter;
    });
  }

  public async sendMail({to, from, subject, templateData}: ISendMailDTO): Promise<void> {
    try {
      const message = await this.client.sendMail({
        from: {
          name: from.name,
          address: from.email,
        },
        to: {
          name: to.name,
          address: to.email,
        },
        subject,
        html: await this.mailTemplateProvider.parse(templateData),
      });

      console.log("Menssagem enviada: %s", message.messageId);
      console.log("Pre-visualização de URL: %s", nodemailer.getTestMessageUrl(message));
    } catch (err) {
      throw new AppError(err);
    }
  }
}

export default EtherealMailProvider;