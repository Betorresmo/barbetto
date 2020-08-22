import { injectable, inject } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';
import mailgun from 'nodemailer-mailgun-transport';
import mailConfig from '@config/mail';

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
          api_key: `${process.env.MAILGUN_KEY}`,
          domain: `${process.env.MAILGUN_DOMAIN}`,
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

    const { name, email } = mailConfig.defaults.from;

    const message = {
      from: {
        name: from?.name || name,
        address: from?.email || email,
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
