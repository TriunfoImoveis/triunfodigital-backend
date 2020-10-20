import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Type {
  N = 'NOVO',
  U = 'USADO',
}

@Entity('payment_types')
class PaymentType {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: Type, nullable: false })
  type: Type;

  @Column({ type: 'varchar', length: 150, nullable: false })
  name: string;

  @Column({ type: 'boolean', default: true })
  active: Boolean;

}

export default PaymentType;
