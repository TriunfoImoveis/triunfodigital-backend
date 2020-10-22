import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('origin_sales')
class OriginSale {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;
}

export default OriginSale;
