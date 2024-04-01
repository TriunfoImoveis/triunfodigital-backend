interface Payment {
  brute: number;
  liquid: number;
}

interface Divison {
  id: string;
  name: string;
  value: number;
}
export interface Comercial {
  seller: Payment,
  captivator: Payment,
  coordinator: Payment,
  director: Payment,
  subsidiary: Payment,
}
export interface IResponseDashboardFinancesDTO {
  comercial: Comercial;
  tax: number;
  divisions?: Divison[];
}
