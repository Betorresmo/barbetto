interface IMailConfig {
  driver: 'ethereal' | 'mailgun';
  defaults: {
    from: {
      name: string;
      email: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      name: 'Barbetto Support',
      email: 'sup.barbetto@gmail.com',
    },
  },
} as IMailConfig;
