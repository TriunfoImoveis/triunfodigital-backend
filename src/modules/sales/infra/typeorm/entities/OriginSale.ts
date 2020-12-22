import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';

import Sale from './Sale';

@Entity('origin_sales')
class OriginSale {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @OneToMany(type => Sale, origin => OriginSale)
  sales: Sale[];
}

export default OriginSale;
