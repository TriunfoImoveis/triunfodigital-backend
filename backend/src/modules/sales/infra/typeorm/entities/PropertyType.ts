import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('property_types')
class PropertyType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;
}

export default PropertyType;
