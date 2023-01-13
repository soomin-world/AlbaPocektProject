import { useQuery, useQueryClient } from "@tanstack/react-query";
import ReactDOM from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { getDaily } from "../../APIs/calendarApi";
import { moreBtnsAtom, workplaceBtnsAtom } from "../../atoms";
import workingTime from "../../hooks/workingTime";
import { ITodos } from "../../types/calendar";

const TodosModal = ({ children, onClose }: any) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  console.log(id);
  const setIsMoreBtns = useSetRecoilState(moreBtnsAtom);
  const setIsWorkplaceBtns = useSetRecoilState(workplaceBtnsAtom);

  // 여기서 id를 가지고 get요청
  const { isLoading, data } = useQuery<ITodos[]>(["todos", id], () =>
    getDaily(id)
  );
  console.log(data);
  // console.log(id?.slice(4, 6));
  // console.log(id?.slice(6, 8));

  // 예시 데이터
  // const todos = [
  //   {
  //     todoId: 1,
  //     year: "2023",
  //     month: "01",
  //     date: "05",
  //     placeName: "카페",
  //     workingTime: "03:30",
  //     startTime: "09:00",
  //     endTime: "12:30",
  //     hourlyWage: "9,620",
  //     dayWage: "33,670",
  //     dayTotalWage: "81,770",
  //     color: "#FFDD94",
  //   },
  //   {
  //     todoId: 2,
  //     year: "2023",
  //     month: "01",
  //     date: "05",
  //     placeName: "영화관",
  //     workingTime: "05:00",
  //     startTime: "13:00",
  //     endTime: "18:00",
  //     hourlyWage: "9,620",
  //     dayWage: "48,100",
  //     dayTotalWage: "81,770",
  //     color: "#D0E6A5",
  //   },
  // ];

  return ReactDOM.createPortal(
    <>
      <Overlay
        onClick={() => {
          navigate("/calendar");
        }}
      ></Overlay>
      {isLoading ? null : (
        <Modal>
          <div>{children}</div>
          <ModalHeader>
            <h2 style={{ height: "16px" }}>
              {id?.slice(4, 6)}.{id?.slice(6, 8)}
            </h2>
          </ModalHeader>

          {data?.length === 0 ? (
            <ModalEmpty>오늘은 일정이 없어요!</ModalEmpty>
          ) : null}

          {data?.map((todo) => {
            return (
              <ModalContent
                onClick={() => {
                  setIsMoreBtns(true);
                  navigate(`/calendar/${id}/${todo.todoId}`);
                }}
              >
                <ModalContentTop>
                  <div>{todo.placeName}</div>
                  <div>{todo.dayWage}</div>
                </ModalContentTop>
                <ModalContentBottom>
                  <div>
                    {todo.startTime}-{todo.endTime}
                  </div>
                  <div>{workingTime(todo.workingTime)}</div>
                </ModalContentBottom>
              </ModalContent>
            );
          })}
          <ModalPlus
            onClick={() => {
              setIsWorkplaceBtns(true);
            }}
          >
            <span>+ 근무 추가</span>
          </ModalPlus>
        </Modal>
      )}
    </>,
    document.getElementById("modal") as Element
  );
};

const Modal = styled.div`
  position: absolute;
  width: 200px;
  height: 300px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 10px;
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
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

const ModalContent = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const ModalContentTop = styled.div`
  padding: 10px;
  padding-bottom: 5px;
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  font-weight: 400;
`;

const ModalContentBottom = styled.div`
  padding: 0px 10px 5px 10px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  /* border-top: 1px solid rgba(0, 0, 0, 0.3); */
`;

const ModalPlus = styled.div`
  width: 180px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 222px;

  background-color: #d0e6a5;
  border-radius: 10px;

  span {
    font-weight: 400;
  }
`;

const ModalEmpty = styled.div`
  margin-top: 20px;
`;
export default TodosModal;
