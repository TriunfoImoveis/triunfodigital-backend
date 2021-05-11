import ICreateCalculatorDTO from "@modules/finances/dtos/ICreateCalculatorDTO";
import Calculator from "@modules/finances/infra/typeorm/entities/Calculator";

export default interface ICalculatorRepository {
  create(data: ICreateCalculatorDTO): Promise<Calculator>;
}