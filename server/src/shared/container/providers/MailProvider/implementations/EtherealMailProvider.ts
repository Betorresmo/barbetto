import { injectable, inject } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import ISendMailDTO from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';

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
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
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
        address: from?.email || 'support@barbetto.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: parsedTemplateData,
    };

    const messageInfo = await this.client.sendMail(message);

    console.log(`Message sent: ${messageInfo.messageId}`);
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(messageInfo)}`);
  }
}

export default EtherealMailProvider;
