import {hash, compare} from 'bcryptjs';
import { container, inject, injectable } from 'tsyringe';
import { add } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import SendValidEmailService from './SendValidEmailService';

interface IRequestDTO {
  id: string;
  old_password?: string;
  body: IUpdateUserDTO;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({
    id,
    old_password,
    body
  }: IRequestDTO): Promise<User | undefined> {
    const user = await this.usersRepository.findById(id);

    if (!user) { //Verifica se o usuario existe.
      throw new AppError('Usuário não existe.', 404);
    }

    if (old_password) { // Verifica se a senha antiga é a mesma no banco de dados.
      const passwordMatched = await compare(old_password, user.password);
      if (!passwordMatched) {
        throw new AppError('Senha incorreta.', 401);
      }
    }

    if (body.password) { // Faz o hash da nova senha.
      body.password = await hash(body.password, 8);
    }

    if (body.email) {
      const {email} = body;
      // Verifica se o usuário está atualizando o e-mail dele.
      if (email === user.email) {
        delete body.email;
      } else {
        const emailExists = await this.usersRepository.findByEmail(email);
        if (emailExists) {
          throw new AppError(
            "Usuário com este e-mail já existe, tente outro e-mail.", 
            400
          );
        }
        body.validated_account = false;
        // Enviar e-mail de validação de conta
        const sendValidEmailService = container.resolve(SendValidEmailService);
        await sendValidEmailService.execute(user.email);
      }  
    }

    if (body.admission_date) {
      body.admission_date = add(body.admission_date, {hours: 3});
    }

    if (body.bank_data) {
      // Se já existe conta bancária cadastrada, pega o id da conta bancária.
      if (user.bank_data) {
        body.bank_data.id = user.bank_data.id;
      }
      user.bank_data = body.bank_data;
      await this.usersRepository.save(user);
      delete body.bank_data;
    }
    
    const userUpdate = await this.usersRepository.update(id, body);

    return userUpdate;
  }
}

export default UpdateUserService;
