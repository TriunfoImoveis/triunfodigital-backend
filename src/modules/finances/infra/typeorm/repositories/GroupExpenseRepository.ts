import { getRepository, Repository } from "typeorm";

import GroupExpense from "@modules/finances/infra/typeorm/entities/GroupExpense";
import AppError from "@shared/errors/AppError";

class GroupExpenseRepository {
    private ormRepository: Repository<GroupExpense>;

    constructor() {
        this.ormRepository = getRepository(GroupExpense);
    }

    async list(): Promise<GroupExpense[]> {
        try {
            const groups = await this.ormRepository.find();
            return groups;
        } catch (err) {
            throw new AppError(err.detail);
        }
    }

    async create(name: string): Promise<GroupExpense> {
        try {
            const groupIntance = this.ormRepository.create({name});
            const newGroup = await this.ormRepository.save(groupIntance);

            return newGroup;
        } catch (err) {
            throw new AppError(err.detail);
        }
    }
}

export default GroupExpenseRepository;