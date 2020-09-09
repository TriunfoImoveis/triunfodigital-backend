import { uuid } from 'uuidv4';

class User {
  id: string;

  name: string;

  email: string;

  password: string;

  phone: string;

  admissionDate: Date;

  goal: number;

  active: boolean;

  constructor(
    name: string,
    email: string,
    password: string,
    phone: string,
    admissionDate: Date,
    goal: number,
  ) {
    this.id = uuid();
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = password;
    this.admissionDate = admissionDate;
    this.goal = goal;
    this.active = true;
  }
}

export default User;
