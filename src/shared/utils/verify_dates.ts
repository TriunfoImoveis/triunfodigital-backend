import { isAfter, isEqual } from "date-fns";

export const verifyDates = (dateFrom?: Date, dateTo?: Date) => {
  if (dateFrom) {
    if (!dateTo) {
      return {
        error: true,
        errorMessage: 'Date de inicio e fim obrigatórios'
      }
    }

    const isDateEqual = isEqual(dateFrom, dateTo);
    if (isDateEqual) {
      return {
        error: true,
        errorMessage: 'Data não podem ser iguais'
      }
    }

    const isAfterDate = isAfter(dateFrom, dateTo);
    if (isAfterDate) {
      return {
        error: true,
        errorMessage: 'Data de inicio deve ser menor que a data de fim'
      }
    }
  }

  if (dateTo) {
    if (!dateFrom) {
      return {
        error: true,
        errorMessage: 'Date de inicio e fim obrigatórios'
      }
    }
  }
  return {
    error: false,
    errorMessage: ''
  }
}
