// import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// export enum Status {
//     PEN = "PENDENTE",
//     VEN = "VENCIDO",
//     PAG = "PAGO",
// }

// @Entity('installments')
// class Installment {
//     @PrimaryGeneratedColumn('uuid')
//     id: string;

//     @Column({ type: 'integer'})
//     installment_number: number;

//     @Column({ type: 'decimal', precision: 14, scale: 2 })
//     value: number;

//     @Column({ type: 'date' })
//     due_date: Date;

//     @Column({ type: 'enum', enum: Status, default: Status.PEN })
//     status: Status;

//     @Column({ type: 'decimal', precision: 14, scale: 2 })
//     amount_paid: number;

//     @Column({ type: 'date' })
//     pay_date: Date;
// }

// export default Installment;