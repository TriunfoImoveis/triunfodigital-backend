import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('group_expenses')
class GroupExpense {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 80 })
    name: string;
}

export default GroupExpense;