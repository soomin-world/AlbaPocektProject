import { ITodosProps } from "../../types/calendar";
import { format } from "date-fns";
import styled from "styled-components";

const RenderDayTotal = ({ day, Month, todos }: ITodosProps) => {
  const dayYear = format(day, "Y");
  const dayMonth = format(day, "M");
  const dayDate = format(day, "dd");
  console.log(dayDate);

  for (const todo of todos) {
    if (
      Month === todo.month &&
      dayYear === todo.year &&
      dayDate === todo.date
    ) {
      return <DayTotal>{todo.dayTotalWage}</DayTotal>;
    }
  }

  return null;
};

const DayTotal = styled.div`
  width: 45px;
  font-size: 11px;
  margin-bottom: 2px;
  position: absolute;
  left: 0px;
  bottom: 0px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default RenderDayTotal;
