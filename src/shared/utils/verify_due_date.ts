import { isPast, parseISO } from "date-fns";

export default function verify_due_date(due_date: Date): string | undefined {
  const dateFormated = parseISO(due_date.toString());
  if (isPast(dateFormated)) {
    return "VENCIDO";
  }
  return "PENDENTE";
}