import { uuid } from 'uuidv4';

class Subsidiary {
  id: string;

  name: string;

  goal: number;

  active: boolean;

  constructor(name: string, goal: number) {
    this.id = uuid();
    this.name = name;
    this.goal = goal;
    this.active = true;
  }
}

export default Subsidiary;
