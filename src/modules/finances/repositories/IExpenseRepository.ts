import Expense from "@modules/finances/infra/typeorm/entities/Expense";
import ICreateExpenseDTO from "@modules/finances/dtos/ICreateExpenseDTO";
import IUpdateExpenseDTO from "@modules/finances/dtos/IUpdateExpenseDTO";

export default interface IExpenseRepository {
    findById(id: string): Promise<Expense | undefined>;
    list(): Promise<Expense[]>;
    create(data: ICreateExpenseDTO): Promise<Expense>;
    update(id: string, data: IUpdateExpenseDTO): Promise<void>;
    delete(id: string): Promise<void>;
}