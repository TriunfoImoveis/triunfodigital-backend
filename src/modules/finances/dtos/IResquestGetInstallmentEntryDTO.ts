
export default interface IRequestGetInstallmentsEntryDTO {
  buyer_name?: string;
  subsidiary?: string;
  month?: string;
  year?: string;
  dateFrom?: Date;
  dateTo?: Date;
  page?: number;
  perPage?: number;
  sort?: 'ASC' | 'DESC';
}
