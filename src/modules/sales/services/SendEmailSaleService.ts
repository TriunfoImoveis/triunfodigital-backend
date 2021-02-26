import path from 'path';

import User from "@modules/users/infra/typeorm/entities/User";
import mailQueue from "@shared/container/providers/JobProvider/implementations/Queue";

interface IRequestDTO {
  to_users: User[];
  subject: string;
  file: string;
  variables: {
    [key: string]: string | string[] | number;
  }
}

class SendEmailSaleService {
  constructor() {}

  public async execute({subject, file, to_users, variables}: IRequestDTO): Promise<void> {
    let listEmails: string[] = [];
    to_users.forEach(user => {
      if (user.validated_account) {
        listEmails.push(user.email);
      }
    });

    if (listEmails.length > 0) {
      const pathSaleTemplate = path.resolve(
        __dirname, 
        '..', 
        'views',
        file
      );

      // Adicionar job RegisterSaleJob na fila
      await mailQueue.add('RegisterSaleJob', {
        to_users: listEmails.toString(),
        subject,
        file: pathSaleTemplate,
        variables,
      });
    }
  }
}

export default SendEmailSaleService;