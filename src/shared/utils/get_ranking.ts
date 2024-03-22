import Sale from "@modules/sales/infra/typeorm/entities/Sale";
import IResponseRankingDTO from "@modules/users/dtos/IResponseRankingDTO";
import User from "@modules/users/infra/typeorm/entities/User";

const getSalesCoordinators = (sales: Sale[], userId: string) => {
  return sales.map(sale => {
    return {
      ...sale,
      realty_ammount: sale.realty_ammount / sale.sale_has_sellers.length
    }
  }).filter(sale => sale.user_coordinator.id === userId);
}
const getSales = (sales: Sale[], userId: string) => {
  return sales.map(sale => {
    return {
      ...sale,
      realty_ammount: sale.realty_ammount / sale.sale_has_sellers.length
    }
  }).filter(sale => sale.sale_has_sellers.find(seller => seller.id === userId));
}
const getSalesCaptivators = (sales: Sale[], userId: string) => {
  return sales.map(sale => {
    return {
      ...sale,
      realty_ammount: sale.realty_ammount / sale.sale_has_sellers.length
    }
  }).filter(sale => sale.sale_has_captivators.find(captivator => captivator.id === userId));
}

const getVGV = (sales: Sale[]) => {
  return sales.map(sale => sale.realty_ammount).reduce((total, realty_ammount) => total += Number(realty_ammount), 0);
}
export const getRanking = (users: User[], sales: Sale[], filter: "sales" | "captivator" | "coordinator") => {
  let ranking: IResponseRankingDTO[] = [];
  if (filter === 'sales') {
    ranking = users.map(user => {
      const vgv = getVGV(getSales(sales, user.id));

      return {
        id: user.id,
        avatar: user.avatar,
        avatar_url: user.getAvatarUrl(),
        name: user.name,
        vgv: Number(vgv.toFixed(2)),
      };
    })
  }
  if (filter === 'coordinator') {
    ranking = users.map(user => {
      const vgv = getVGV(getSalesCoordinators(sales, user.id));

      return {
        id: user.id,
        avatar: user.avatar,
        avatar_url: user.getAvatarUrl(),
        name: user.name,
        vgv: Number(vgv.toFixed(2)),
      };
    })
  }
  if (filter === 'captivator') {
    ranking =  users.map(user => {
      const vgv = getVGV(getSalesCaptivators(sales, user.id));

      return {
        id: user.id,
        avatar: user.avatar,
        avatar_url: user.getAvatarUrl(),
        name: user.name,
        vgv: Number(vgv.toFixed(2)),
      };
    })
  }

  return ranking;
}
