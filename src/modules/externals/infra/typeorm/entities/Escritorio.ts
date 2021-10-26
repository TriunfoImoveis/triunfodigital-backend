import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('external_escritorios')
class Escritorio {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 80 })
    nome: string;
}

export default Escritorio;