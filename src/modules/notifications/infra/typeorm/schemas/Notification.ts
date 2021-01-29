import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  ObjectID, 
  ObjectIdColumn, 
  UpdateDateColumn 
} from "typeorm";
import Room from "./Room";

@Entity('notifications')
class Notification {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  content: string;

  @Column('uuid')
  sale_id: string;

  @Column(type => Room)
  room: Room[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Notification;