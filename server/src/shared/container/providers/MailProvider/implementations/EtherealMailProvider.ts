import nodemailer, { Transporter } from 'nodemailer';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
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

  public async sendMail(to: string, body: string): Promise<void> {
    const message = {
      from: 'Barbetto Support <support@barbetto.com>',
      to,
      subject: 'Password Recovery',
      text: body,
    };

    const messageInfo = await this.client.sendMail(message);

    console.log(`Message sent: ${messageInfo.messageId}`);
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(messageInfo)}`);
  }
}

export default EtherealMailProvider;
