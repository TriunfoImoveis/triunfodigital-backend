import { getRepository, Repository } from "typeorm";

import IProfessionRepository from "@modules/sales/repositories/IProfessionRepository";
import Profession from "../entities/Professions";
import ICreateProfessionDTO from "@modules/sales/dtos/ICreateProfessionDTO";
import IUpdateProfessionDTO from "@modules/sales/dtos/IUpdateProfessionDTO";
import normalizeName from "@shared/utils/nomalize_name";

class ProfessionsRepository implements IProfessionRepository {
  private ormRepository: Repository<Profession>;

  constructor() {
    this.ormRepository = getRepository(Profession);
  }
  public async findAll(active?: boolean): Promise<Profession[]> {
    const where = active === undefined ? undefined : { active };
    return this.ormRepository.find({
      where,
      order: {
        name: 'ASC',
      },
      select: ['id', 'name', 'active'],
    });
  }

  public async findById(id: string): Promise<Profession | undefined> {
    return this.ormRepository.findOne(id, {
      select: ['id', 'name', 'active'],
    });
  }

  public async findByName(name: string): Promise<Profession | undefined> {
    const normalized = normalizeName(name);
    return this.ormRepository.findOne({ where: { normalized_name: normalized } });
  }

  public async create(data: ICreateProfessionDTO): Promise<Profession | undefined> {
    const profession = this.ormRepository.create({
      ...data,
      normalized_name: normalizeName(data.name),
    });

    await this.ormRepository.save(profession);
    return profession;
  }

  public async update(data: IUpdateProfessionDTO): Promise<Profession | undefined> {
    const profession = await this.ormRepository.findOne(data.id);
    if (!profession) return undefined;

    profession.name = data.name ?? profession.name;
    profession.active = typeof data.active === 'boolean' ? data.active : profession.active;
    profession.normalized_name = normalizeName(profession.name);

    await this.ormRepository.save(profession);
    return profession;
  }
}

export default ProfessionsRepository;
