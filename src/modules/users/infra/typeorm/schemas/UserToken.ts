import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectID,
  ObjectIdColumn
} from 'typeorm';

@Entity('user_tokens')
class UserToken {
  @ObjectIdColumn()
  id: ObjectID;

  @Column('uuid')
  token: string;

  @Column('uuid')
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserToken;
