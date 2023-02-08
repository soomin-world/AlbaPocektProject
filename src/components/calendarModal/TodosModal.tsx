import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Divider } from "antd";
import { useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { getDaily, getDayBonus } from "../../APIs/calendarApi";
import { getWorks } from "../../APIs/workApi";
import { moreBtnsAtom, workplaceBtnsAtom } from "../../atoms";
import comma from "../../hooks/comma";
import workingTime from "../../hooks/workingTime";
import { ITodos } from "../../types/calendar";
import sweetAlert from "../../util/sweetAlert";
import DropDown from "../dropDown/DropDown";
import TodoModalContent from "./TodoModalContent";

interface IBonus {
  placeName: string;
  bonus: string;
  color: string;
  year: string;
  month: string;
  date: string;
  startDate: string;
  endDate: string;
}

const TodosModal = ({ children, onClose }: any) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const setIsMoreBtns = useSetRecoilState(moreBtnsAtom);
  const setIsWorkplaceBtns = useSetRecoilState(workplaceBtnsAtom);
  const [isOpen, setIsOpen] = useState(false);

  const { data: workList } = useQuery(["workList"], () => getWorks());

  // console.log(workList?.data.workist);
  // 여기서 id를 가지고 get요청
  const { isLoading, data } = useQuery<ITodos[]>(["todos", id], () =>
    getDaily(id)
  );

  const { data: bonusData } = useQuery<IBonus[]>(["bonus", id], () =>
    getDayBonus(id)
  );
  // console.log(bonusData);

  return ReactDOM.createPortal(
    <>
      <Overlay
        onClick={() => {
          navigate("/calendar");
        }}
      ></Overlay>
      {isLoading ? null : (
        <Modal>
          <Position>
            <div>{children}</div>
            <ModalHeader>
              <h2 style={{ height: "16px", fontWeight: "500" }}>
                {id?.slice(4, 6)}.{id?.slice(6, 8)}
              </h2>
            </ModalHeader>

            {data?.length === 0 && bonusData?.length === 0 ? (
              <ModalEmpty>
                <div>오늘은 일정이 없어요!</div>
                <img src="/image/iconTodoEmpty.svg" />
              </ModalEmpty>
            ) : null}

            {data?.map((todo) => {
              return (
                <ModalContent
                  onClick={() => {
                    setIsMoreBtns(true);
                    navigate(`/calendar/${id}/${todo.todoId}`);
                  }}
                >
                  <ModalContentTop color={todo.color}>
                    <TodoModalContent todo={todo} />
                  </ModalContentTop>

                  <ModalContentBottom>
                    <div>
                      {todo.startTime} ~ {todo.endTime}
                    </div>
                    <div>{workingTime(todo.workingTime)}</div>
                  </ModalContentBottom>
                </ModalContent>
              );
            })}

            {bonusData?.length !== 0
              ? bonusData?.map((bonus) => {
                  return (
                    <ModalContent>
                      <ModalContentTop color={bonus.color}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div className="color"></div>
                          <div>{bonus.placeName}</div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginRight: "20px",
                          }}
                        >
                          <div>{comma(bonus.bonus)}원</div>
                        </div>
                      </ModalContentTop>
                      <ModalContentBottom>
                        <div>
                          {bonus.startDate.slice(5, 7)}.
                          {bonus.startDate.slice(8, 10)}~
                          {bonus.endDate.slice(5, 7)}.
                          {bonus.endDate.slice(8, 10)}
                        </div>
                        <div>주휴수당</div>
                      </ModalContentBottom>
                    </ModalContent>
                  );
                })
              : null}

            <ModalBtn>
              <ModalPlus
                onClick={() => {
                  navigate("/calendar");
                }}
              >
                <div>닫기</div>
              </ModalPlus>
              <ModalPlus
                onClick={() => {
                  if (workList?.data.workList.length === 0) {
                    navigate("/calendar");
                    return sweetAlert(
                      1000,
                      "error",
                      "근무지를 먼저 등록해주세요!"
                    );
                  }
                  setIsWorkplaceBtns(true);
                }}
              >
                <div>근무 등록</div>
              </ModalPlus>
            </ModalBtn>
          </Position>
        </Modal>
      )}
    </>,
    document.getElementById("modal") as Element
  );
};

const Modal = styled.div`
  position: absolute;
  width: 275px;
  height: 327px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 12px;
`;

const Position = styled.div`
  width: 275px;
  height: 327px;
  position: "relative";
  //border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Overlay = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #d9d9d9;
`;

const ModalContent = styled.div`
  width: 100%;
  height: 68px;
  border-bottom: 1px solid #d9d9d9;
`;

const ModalContentTop = styled.div<{ color: string }>`
  padding: 15px 5px 5px 15px;
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  font-weight: 500;
  position: relative;

  div {
    height: 16px;
  }
  .color {
    width: 8px;
    height: 8px;
    background-color: ${(props) => props.color};
    margin-right: 7px;
  }
`;

const ModalContentBottom = styled.div`
  padding: 8px 25px 15px 15px;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 400;
  color: #aeaeae;
  /* border-top: 1px solid rgba(0, 0, 0, 0.3); */
`;

const ModalBtn = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 15px;
  width: 250px;
`;

const ModalPlus = styled.div`
  width: 133px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* position: absolute;
  left: 10px;
  bottom: 10px; */

  background-color: #d0e6a5;
  border-radius: 10px;
  cursor: pointer;

  div {
    height: 16px;
    font-size: 16px;
    font-weight: 500;
  }
  &:first-child {
    margin: 0px 11px 0px 0px;
    background-color: #f2f3f5;
  }
  &:last-child {
    background-color: #5fce80;
    color: white;
  }
`;

const ModalEmpty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    font-size: 18px;
    font-weight: 500;
    margin: 55px 0px 20px 0px;
  }
  img {
    width: 70px;
    height: 70px;
  }
`;

export default TodosModal;
