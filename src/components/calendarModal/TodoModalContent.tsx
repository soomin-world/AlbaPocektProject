import { useState } from "react";
import styled from "styled-components";
import comma from "../../hooks/comma";
import { ITodos } from "../../types/calendar";
import DropDown from "../dropDown/DropDown";

interface ITodoProps {
  todo: ITodos;
}
const TodoModalContent = ({ todo }: ITodoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* {isOpen ? (
        <DropDown
          id={todo.todoId}
          address={`/editShift/${todo.todoId}`}
          deleteValue="shift"
        />
      ) : null} */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="color"></div>
        <div className="placeName">{todo.placeName}</div>
      </div>

      <div
        style={{ display: "flex", alignItems: "center", position: "relative" }}
      >
        <div>{comma(todo.dayWage)}원</div>
        <img
          src="/image/iconDots.svg"
          onClick={() => setIsOpen(!isOpen)}
          style={{ cursor: "pointer" }}
        />
        <Wrap>
          {isOpen ? (
            <DropDown
              id={todo.todoId}
              setIsOpen={setIsOpen}
              address={`/editShift/${todo.todoId}`}
              deleteValue="shift"
            />
          ) : null}
        </Wrap>
      </div>
    </>
  );
};

const Wrap = styled.div`
  position: absolute;
  top: 27px;
  left: 57px;
`;

export default TodoModalContent;
