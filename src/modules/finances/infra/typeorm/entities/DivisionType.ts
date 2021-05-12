import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('division_types')
class DivisionType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 80 })
  name: string;
}

export default DivisionType;