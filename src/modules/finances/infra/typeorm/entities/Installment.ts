import { 
    Column, 
    Entity, 
    ManyToOne, 
    PrimaryGeneratedColumn,
    JoinColumn, 
} from "typeorm";

import Sale from "@modules/sales/infra/typeorm/entities/Sale";

export enum StatusInstallment {
    PEN = "PENDENTE",
    VEN = "VENCIDO",
    PAG = "PAGO",
    CAI = "CAIU",
}

@Entity('installments')
class Installment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'integer', nullable: false})
    installment_number: number;

    @Column({ type: 'decimal', precision: 14, scale: 2,  nullable: false })
    value: number;

    @Column({ type: 'date', nullable: false })
    due_date: Date;

    @Column({ type: 'enum', enum: StatusInstallment, default: StatusInstallment.PEN })
    status: StatusInstallment;

    @Column({ type: 'decimal', precision: 14, scale: 2, nullable: true })
    amount_paid: number;

    @Column({ type: 'date', nullable: true })
    pay_date: Date;

    @ManyToOne(type => Sale, sale => sale.installments, {
        nullable: false, 
        onUpdate: "CASCADE", 
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: 'sale_id' })
    sale: Sale;
}

export default Installment;