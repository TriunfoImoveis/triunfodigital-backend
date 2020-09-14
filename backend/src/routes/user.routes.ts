import { Router } from 'express';
import { getRepository } from 'typeorm';

import User from '../entities/User';
import CreateUserService from '../services/CreateUserService';

import AppError from '../errors/AppError';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
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

  const newUser = await createUser.execute({
    name,
    email,
    password,
    phone,
    admission_date,
    goal,
    departament_id,
    office_id,
  });

  return response.json(newUser);
});

export default usersRouter;
