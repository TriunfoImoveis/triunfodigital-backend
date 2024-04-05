import ICreateNeighborhoodDTO from "@modules/externals/dtos/ICreateNeighborhoodDTO";
import IRequestNeighborhoodDTO from "@modules/externals/dtos/IRequestNeighborhoodDTO";
import IUpdateNeighborhoodDTO from "@modules/externals/dtos/IUpdateNeighborhoodDTO";
import INeighborhoodRepository from "@modules/externals/repositories/INeighborhoodRepository";
import Neighborhood from "../entities/Neighborhood";
import { Brackets, QueryFailedError, Repository, getRepository } from "typeorm";
import AppError from "@shared/errors/AppError";

class NeighborhoodRepository implements INeighborhoodRepository {
  private ormRepository: Repository<Neighborhood>;

  constructor() {
    this.ormRepository = getRepository(Neighborhood);
  }
  async findById(id: string): Promise<Neighborhood | undefined> {
    try {
      const neighborhood = await this.ormRepository.findOneOrFail(id);
      return neighborhood;
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new AppError(err.message, 500);
      }

      throw new AppError('Internal Server Error', 500);
    }
  }
  async findAll(): Promise<Neighborhood[]> {
    try {
      const neighborhood = await this.ormRepository.find();
      return neighborhood;
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new AppError(err.message, 500);
      }

      throw new AppError('Internal Server Error', 500);
    }
  }
  async create(data: ICreateNeighborhoodDTO): Promise<void> {
    try {
      const newNeighborhood = this.ormRepository.create(data);
      await this.ormRepository.save(newNeighborhood);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new AppError(err.message, 500);
      }

      throw new AppError('Internal Server Error', 500);
    }
  }
  async update(id: string, data: IUpdateNeighborhoodDTO): Promise<void> {
    try {
      await this.ormRepository.update(id, data);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new AppError(err.message, 500);
      }

      throw new AppError('Internal Server Error', 500);
    }
  }
  async delete(id: string): Promise<void> {
    try {
      await this.ormRepository.update(id, {active: false});
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new AppError(err.message, 500);
      }

      throw new AppError('Internal Server Error', 500);
    }
  }
  async findByFilters(filters: IRequestNeighborhoodDTO): Promise<Neighborhood[]> {
    const {name, city, uf, active} = filters;
    try {
      const neighborhoods = await this.ormRepository.createQueryBuilder("neighborhood")
      .select()
      .where(new Brackets(qb => {
        if (uf) {
          qb.andWhere("neighborhood.uf = :uf", { uf })
        }
        if (city) {
          qb.andWhere("neighborhood.city = :city", { city })
        }
        if (name) {
          qb.andWhere("neighborhood.name = :name", { name })
        }
        if (active) {
          qb.andWhere("neighborhood.active = :active", { active })
        }
      }))
      .orderBy("neighborhood.name", "ASC")
      .getMany();

    return neighborhoods;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new AppError(error.message, 500);
      }

      throw new AppError('Internal Server Error', 500);
    }
    }
  }

export default NeighborhoodRepository;
