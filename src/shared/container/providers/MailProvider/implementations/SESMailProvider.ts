import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import aws from 'aws-sdk';

import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import ISendMailDTO from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import AppError from '@shared/errors/AppError';

@injectable()
class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: 'us-east-1',
      }),
    })
  }

  public async sendMail({
    to, 
    from, 
    subject, 
    templateData
  }: ISendMailDTO): Promise<void> {
    try {
      await this.client.sendMail({
        from: {
          name: from.name,
          address: from.email,
        },
        to,
        subject,
        html: await this.mailTemplateProvider.parse(templateData),
      });
    } catch (err) {
      throw new AppError(err);
    }
  }
}

export default SESMailProvider;