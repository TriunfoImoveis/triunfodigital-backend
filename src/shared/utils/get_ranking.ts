import Sale from "@modules/sales/infra/typeorm/entities/Sale";
import IResponseRankingDTO from "@modules/users/dtos/IResponseRankingDTO";
import User from "@modules/users/infra/typeorm/entities/User";

type RankingType = "sales" | "captivator" | "coordinator";

const toCents = (value: number) => Math.round(Number(value) * 100);

const safeDivide = (value: number, divisor: number) => {
  if (!divisor) {
    return 0;
  }

  return Math.round(value / divisor);
};

const splitSaleByRole = (sale: Sale, role: RankingType) => {
  if (role === "sales") {
    return safeDivide(toCents(sale.realty_ammount), sale.sale_has_sellers.length);
  }

  if (role === "captivator") {
    return safeDivide(toCents(sale.realty_ammount), sale.sale_has_captivators.length);
  }

  // Coordenador: modelo atual aceita apenas um coordenador por venda.
  return safeDivide(toCents(sale.realty_ammount), 1);
};

const filterSalesByRole = (sales: Sale[], userId: string, role: RankingType) => {
  return sales
    .filter(sale => {
      if (role === "sales") {
        return sale.sale_has_sellers.some(seller => seller.id === userId);
      }

      if (role === "captivator") {
        return sale.sale_has_captivators.some(captivator => captivator.id === userId);
      }

      const hasCoordinator = sale.user_coordinator && sale.user_coordinator.id;
      return hasCoordinator === userId;
    })
    .map(sale => ({
      ...sale,
      realty_ammount: splitSaleByRole(sale, role),
    }));
};

const getVGV = (sales: Sale[]) => {
  return sales
    .map(sale => sale.realty_ammount)
    .reduce((total, realty_ammount) => (total += Number(realty_ammount)), 0);
};

export const getRanking = (users: User[], sales: Sale[], filter: RankingType) => {
  const ranking: IResponseRankingDTO[] = users.map(user => {
    const userSales = filterSalesByRole(sales, user.id, filter);
    const vgv = getVGV(userSales);

    return {
      id: user.id,
      avatar: user.avatar,
      avatar_url: user.getAvatarUrl(),
      name: user.name,
      vgv: Number((vgv / 100).toFixed(2)),
    };
  });

  return ranking;
};
