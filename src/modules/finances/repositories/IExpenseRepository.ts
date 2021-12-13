import Expense from "@modules/finances/infra/typeorm/entities/Expense";
import ICreateExpenseDTO from "@modules/finances/dtos/ICreateExpenseDTO";
import IUpdateExpenseDTO from "@modules/finances/dtos/IUpdateExpenseDTO";
import IRequestSaldoDTO from "@modules/externals/dtos/IRequestSaldoDTO";

export default interface IExpenseRepository {
    findById(id: string): Promise<Expense | undefined>;
    findByStatus(status: string): Promise<Expense[]>;
    findByFilters(data: IRequestSaldoDTO): Promise<Expense[]>;
    list(): Promise<Expense[]>;
    create(data: ICreateExpenseDTO): Promise<Expense>;
    update(id: string, data: IUpdateExpenseDTO): Promise<void>;
    delete(id: string): Promise<void>;
}