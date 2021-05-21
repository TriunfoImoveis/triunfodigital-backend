import { 
  Column, 
  Entity, 
  JoinColumn, 
  ManyToOne, 
  PrimaryGeneratedColumn 
} from "typeorm";

import User from "@modules/users/infra/typeorm/entities/User";
import Calculator from "./Calculator";

export enum ParticipantType {
  VEN = "VENDEDOR",
  CAP = "CAPTADOR",
  COO = "COORDENADOR",
  DIR = "DIRETOR",
  EMP = "EMPRESA",
}

@Entity('comissions')
class Comission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: "enum", enum: ParticipantType, nullable: false })
  participant_type: ParticipantType;

  @Column({ type: 'decimal', precision: 4, scale: 2,  nullable: false })
  comission_percentage: number;

  @Column({ type: 'decimal', precision: 14, scale: 2,  nullable: false })
  comission_integral: number;

  @Column({ type: 'decimal', precision: 4, scale: 2,  nullable: true })
  tax_percentage: number;

  @Column({ type: 'decimal', precision: 14, scale: 2,  nullable: true })
  tax_value: number;

  @Column({ type: 'decimal', precision: 14, scale: 2,  nullable: false })
  comission_liquid: number;

  @ManyToOne(type => Calculator, comission => comission.participants, {nullable: false, onUpdate: "CASCADE", onDelete: "CASCADE"})
  @JoinColumn({ name: 'calculation_id' })
  calculation: Calculator;

  @ManyToOne(type => User, {nullable: true})
  @JoinColumn({ name: 'user_id' })
  user: User;
}

export default Comission;