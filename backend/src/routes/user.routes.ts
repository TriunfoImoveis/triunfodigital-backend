import { Router } from 'express';
import { getRepository } from 'typeorm';

import User from '../entities/User';
import CreateUserService from '../services/CreateUserService';


const usersRouter = Router();

usersRouter.get('/', async (request, response) =>{
  const usersRepository = getRepository(User);

  const usersList = await usersRepository.find({
    select: [
      'name',
      'email',
      'phone',
      'admission_date',
      'goal',
      'departament_id',
      'office_id',
      'active',
      'created_at',
      'updated_at',
    ],
    where: {
      active: true,
    },
  });

  return response.json(usersList);
});

usersRouter.post('/', async (request, response) => {
  try {
      const {
        name,
        email,
        password,
        phone,
        admission_date,
        goal,
        departament_id,
        office_id,
      } = request.body;

      const createUser = new CreateUserService();

      await createUser.execute({
        name,
        email,
        password,
        phone,
        admission_date,
        goal,
        departament_id,
        office_id,
      });

      return response.status(201).json({
        message: 'User created with success.'
      });

  } catch (e) {
      return response.status(400).json({
        status: 'Bad Request',
        message: e.message,
      });
  }
});

export default usersRouter;
