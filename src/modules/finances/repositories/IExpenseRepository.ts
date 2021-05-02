import Expense from "@modules/finances/infra/typeorm/entities/Expense";
import ICreateExpenseDTO from "@modules/finances/dtos/ICreateExpenseDTO";

export default interface IExpenseRepository {
    list(): Promise<Expense[]>;
    create(data: ICreateExpenseDTO): Promise<Expense>;
}