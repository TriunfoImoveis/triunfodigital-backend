import { ParticipantType } from "@modules/finances/infra/typeorm/entities/Comission";
import Installment from "@modules/finances/infra/typeorm/entities/Installment";

const reducer = (accumulator: number, currentValue: number) => accumulator + currentValue;
export const generateDivisionValue = (
  sale: Installment[],
  typeDivisionid: string,
) => {
  return sale
    .map(item => item.calculation.divisions && item.calculation.divisions)
    .map(item => {
      return item
        .map(item =>
          item.division_type.id === typeDivisionid ? Number(item.value) : 0,
        )
        .reduce(reducer, 0);
    })
    .reduce(reducer, 0);
};

interface generateValueProps {
  installment: Installment,
  type: ParticipantType
}
export const generateBruteValue = ({installment, type}: generateValueProps) => {
  return installment.calculation.participants.filter(participant => participant.participant_type === type)
  .map(participant => participant.comission_integral || 0).reduce((total, comissionValue) => total + Number(comissionValue), 0);
}
export const generateLiquidValue = ({installment, type}: generateValueProps) => {
  return installment.calculation.participants.filter(participant => participant.participant_type === type)
  .map(participant => participant.comission_liquid || 0).reduce((total, comissionValue) => total + Number(comissionValue), 0);
}
