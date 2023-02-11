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
    <Container>
      <Top>
        <div className="color"></div>
        <div className="placeName">{todo.placeName}</div>
      </Top>

      <Top>
        <div className="placeName">{comma(todo.dayWage)}원</div>
        <img
          src="/image/iconDots.svg"
          onClick={() => setIsOpen(!isOpen)}
          style={{ cursor: "pointer" }}
          alt=""
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
      </Top>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-family: "Noto Sans KR";
  position: relative;
`;

const Top = styled.div`
  display: flex;
  align-items: center;

  .placeName {
    margin-top: -2px;
  }
`;

const Wrap = styled.div`
  position: absolute;
  top: 30px;
  right: 15px;
`;

export default TodoModalContent;
