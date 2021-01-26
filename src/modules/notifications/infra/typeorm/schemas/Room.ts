import { 
  Column,
} from "typeorm";

class Room {
  @Column('uuid')
  user_id: string;

  @Column()
  read: Boolean;
}

export default Room;