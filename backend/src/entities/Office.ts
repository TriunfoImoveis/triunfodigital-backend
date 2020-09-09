import { uuid } from 'uuidv4';

class Office {
  id: string;

  name: string;

  constructor(name: string) {
    this.id = uuid();
    this.name = name;
  }
}

export default Office;
