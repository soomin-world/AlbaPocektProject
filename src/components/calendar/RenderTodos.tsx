import styled from "styled-components";
import { ITodosProps } from "../../types/calendar";

const RenderTodos = ({ day, Month, todos }: ITodosProps) => {
  // console.log(day);
  const date = String(day).split(" ");
  // console.log(date);
  const todoList = [];

  // console.log(date[2] === "15");
  // console.log(Month);
  // if (Month)
  // 현재 달에 해당하지 않으면 표시 X...다음달에 표시 X
  for (const todo of todos) {
    if (
      todo.year === date[3] &&
      todo.month === Month &&
      todo.date === date[2]
    ) {
      todoList.push(
        <CellTodo key={todo.todoId} color={todo.color}>
          {todo.placeName}
        </CellTodo>
      );
    }
  }
  return <CellTodoList>{todoList}</CellTodoList>;
};

const CellTodo = styled.div<{ color: string }>`
  width: 43px;
  height: 15px;
  margin-bottom: 2px;
  border-radius: 3px;
  background-color: ${(props) => props.color};
  font-size: small;
`;

const CellTodoList = styled.div`
  width: 47px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default RenderTodos;
