import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Type {
  N = 'NOVO',
  U = 'USADO',
}

export enum TypeStatus {
  T = "TOTAL",
  P = "PARCELADO",
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

  @Column({ type: 'enum', enum: TypeStatus, nullable: true })
  status: TypeStatus;

}

export default PaymentType;
