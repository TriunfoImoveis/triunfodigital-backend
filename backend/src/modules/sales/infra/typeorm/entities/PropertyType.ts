import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';

import Realty from './Realty';

@Entity('property_types')
class PropertyType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @OneToMany(type => Realty, property => PropertyType)
  realties: Realty[];
}

export default PropertyType;
