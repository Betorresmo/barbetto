import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

interface IMessage {
  to: string;
  body: string;
}

class FakeMailProvider implements IMailProvider {
  private emails: IMessage[] = [];

  public async sendMail(to: string, body: string): Promise<void> {
    const message = {
      to,
      body,
    };

    this.emails.push(message);
  }
}

export default FakeMailProvider;
