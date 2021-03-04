import * as dotenv from 'dotenv';

dotenv.config();

interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      emailDefault: string;
      nameDefault: string;
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      emailDefault: 'suporte@triunfoimoveis.com',
      nameDefault: 'Equipe Triunfo Digital',
    }
  }
} as IMailConfig;