import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn
} from "typeorm";
import Conta from "./Conta";
import Escritorio from "./Escritorio";

export enum TipoDespesa {
  E = "ENTRADA",
  S = "SAIDA",
}

@Entity('external_despesas')
class Despesa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: TipoDespesa })
  tipo_despesa: TipoDespesa;

  @Column({ type: 'varchar', length: 255 })
  descricao: string;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  valor: number;

  @ManyToOne(type => Escritorio, {nullable: false})
  @JoinColumn({ name: 'id_escritorio' })
  escritorio: Escritorio;
  
  @ManyToOne(type => Conta, {nullable: true})
  @JoinColumn({ name: 'id_conta' })
  conta: Conta;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Despesa;