import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import EtherealMailProvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';
import MailgunMailProvider from '@shared/container/providers/MailProvider/implementations/MailgunMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  mailgun: container.resolve(MailgunMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
