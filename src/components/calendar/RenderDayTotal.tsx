import { ITodosProps } from "../../types/calendar";
import { format } from "date-fns";
import styled from "styled-components";

const RenderDayTotal = ({ day, Month, todos }: ITodosProps) => {
  const dayYear = format(day, "Y");
  const dayMonth = format(day, "MM");
  const dayDate = format(day, "dd");
  // console.log(dayDate);

  for (const todo of todos) {
    if (
      todo.year === dayYear &&
      todo.month === dayMonth &&
      dayMonth === Month &&
      todo.date === dayDate
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
