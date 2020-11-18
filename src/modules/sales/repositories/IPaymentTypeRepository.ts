import PaymentType from "@modules/sales/infra/typeorm/entities/PaymentType";
import ICreatePaymentTypeDTO from "@modules/sales/dtos/ICreatePaymentTypeDTO";


export default interface IPaymentTypeRepository {
  findNewOrUsed(type: string): Promise<PaymentType[]>;
  findById(id: string): Promise<PaymentType | undefined>;
  create(data: ICreatePaymentTypeDTO): Promise<PaymentType | undefined>;
}
