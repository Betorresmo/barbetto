import { injectable, inject } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';
import mailgun from 'nodemailer-mailgun-transport';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import ISendMailDTO from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';

@injectable()
class NodemailerMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    const transporter = nodemailer.createTransport(
      mailgun({
        auth: {
          api_key: `${process.env.APP_MAILGUN_KEY}`,
          domain: `${process.env.APP_MAILGUN_DOMAIN}`,
        },
      }),
    );

    this.client = transporter;
  }

  public async sendMail({
    from,
    to,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const parsedTemplateData = await this.mailTemplateProvider.parse(
      templateData,
    );

    const message = {
      from: {
        name: from?.name || 'Barbetto Support',
        address: from?.email || `${process.env.APP_EMAIL_USR}`,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: parsedTemplateData,
    };

    await this.client.sendMail(message);
  }
}

export default NodemailerMailProvider;
