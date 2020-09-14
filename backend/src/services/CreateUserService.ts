import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../entities/User';


interface RequestDTO {
    name: string;
    email: string;
    password: string;
    phone: string;
    admission_date: Date;
    goal: number;
    departament_id: string;
    office_id: string;
}

class CreateUserService {
  public async execute(
    {
      name,
      email,
      password,
      phone,
      admission_date,
      goal,
      departament_id,
      office_id,
    }: RequestDTO): Promise<User> {
      const usersRepository = getRepository(User);

      const checkEmailExist = await usersRepository.findOne({
        where: { email }
      });

      if (checkEmailExist) {
        throw new Error('E-mail address already used.');
      }

      const hashedPassword = await hash(password, 8);

      const user = usersRepository.create({
        name,
        email,
        password: hashedPassword,
        phone,
        admission_date,
        goal,
        departament_id,
        office_id
      });

      usersRepository.save(user);

      return user;
    }
}

export default CreateUserService;
