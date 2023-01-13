import styled from "styled-components";
import { format } from "date-fns";
import { ITodosProps } from "../../types/calendar";
import workingTime from "../../hooks/workingTime";

const RenderTodos = ({ day, Month, todos }: ITodosProps) => {
  // console.log(todos);
  const dayMonth = format(day, "MM");
  const date = String(day).split(" ");
  // console.log(date);
  const todoList = [];

  // console.log(Month);

  // 현재 달에 해당하지 않으면 표시 X...다음달에 표시 X
  for (const todo of todos) {
    if (
      todo.year === date[3] &&
      todo.month === dayMonth &&
      dayMonth === Month &&
      todo.date === date[2]
    ) {
      todoList.push(
        <CellTodo key={todo.todoId} color={todo.color}>
          {workingTime(todo.workingTime)}
        </CellTodo>
      );
    }
  }
  return <CellTodoList>{todoList}</CellTodoList>;
};

const CellTodo = styled.div<{ color: string }>`
  width: 51px;
  height: 15px;
  margin-bottom: 2px;
  border-radius: 3px;
  background-color: ${(props) => props.color};
  font-size: 2px;
  display: flex;
  align-items: center;
`;

const CellTodoList = styled.div`
  width: 55px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default RenderTodos;
