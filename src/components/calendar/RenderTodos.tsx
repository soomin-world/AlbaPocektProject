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
      console.log(workingTime(todo.workingTime).length);

      // if (workingTime(todo.workingTime).length !== 8) {
      todoList.push(
        <CellTodo key={todo.todoId} color={todo.color}>
          <div>{workingTime(todo.workingTime)}</div>
        </CellTodo>
      );
      // } else {
      //   todoList.push(
      //     <CellTodo key={todo.todoId} color={todo.color}>
      //       {workingTime(todo.workingTime)}
      //     </CellTodo>
      //   );
      // }
      // todoList.push(
      //   <CellTodo key={todo.todoId} color={todo.color}>
      //     {workingTime(todo.workingTime)}
      //   </CellTodo>
      // );
    }
  }
  return <CellTodoList>{todoList}</CellTodoList>;
};

const CellTodo = styled.div<{ color: string }>`
  width: 48px;
  min-width: 48px;
  height: 15px;
  margin-bottom: 2px;
  // padding-top: 1px;
  border-radius: 3px;
  background-color: ${(props) => props.color};
  font-size: 10px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    height: 11px;
  }
`;

const CellTodoList = styled.div`
  display: flex;
  flex-direction: column;
`;

export default RenderTodos;
