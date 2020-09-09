import { uuid } from 'uuidv4';

class Departament {
  id: string;

  name: string;

  initials: string;

  goal: number;

  active: boolean;

  constructor(name: string, initials: string, goal: number) {
    this.id = uuid();
    this.name = name;
    this.initials = initials;
    this.goal = goal;
    this.active = true;
  }
}

export default Departament;
