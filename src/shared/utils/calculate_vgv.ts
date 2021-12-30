import Sale from "@modules/sales/infra/typeorm/entities/Sale";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";

export async function calculate_vgv(sales: Sale[]): Promise<number> {
  const usersRepository = new UsersRepository();
  let vgv = 0;
  await Promise.all(
    sales.map(async sale => {
      const quantity = await usersRepository.quantitySellers(sale.id);
      const partialSale = sale.realty_ammount/quantity;
      vgv += partialSale;
    })
  );

  return Number(vgv.toFixed(2));
}