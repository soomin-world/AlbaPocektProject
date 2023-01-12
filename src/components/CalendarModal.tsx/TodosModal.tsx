import ReactDOM from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { moreBtnsAtom, workplaceBtnsAtom } from "../../atoms";
import MoreBtnsModal from "./MoreBtnsModal";
import WorkplaceBtnsModal from "./WorkplaceBtnsModal";

const TodosModal = ({ children, onClose }: any) => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const setIsMoreBtns = useSetRecoilState(moreBtnsAtom);
  const setIsWorkplaceBtns = useSetRecoilState(workplaceBtnsAtom);

  const todos = [
    {
      todoId: 1,
      year: "2023",
      month: "01",
      date: "05",
      placeName: "카페",
      workingTime: "03:30",
      startTime: "09:00",
      endTime: "12:30",
      hourlyWage: "9,620",
      dayWage: "33,670",
      dayTotalWage: "81,770",
      color: "#FFDD94",
    },
    {
      todoId: 2,
      year: "2023",
      month: "01",
      date: "05",
      placeName: "영화관",
      workingTime: "05:00",
      startTime: "13:00",
      endTime: "18:00",
      hourlyWage: "9,620",
      dayWage: "48,100",
      dayTotalWage: "81,770",
      color: "#D0E6A5",
    },
  ];

  return ReactDOM.createPortal(
    <>
      <Overlay
        onClick={() => {
          navigate("/calendar");
        }}
      ></Overlay>
      <Modal>
        <div>{children}</div>
        <ModalHeader>
          <h2 style={{ height: "16px" }}>
            {todos[0].month}.{todos[0].date}
          </h2>
        </ModalHeader>

        {todos.map((todo) => {
          return (
            <ModalContent
              onClick={() => {
                setIsMoreBtns(true);
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
                <div>{todo.workingTime}</div>
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
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.3); */
`;

const ModalContent = styled.div`
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
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
  position: relative;
  bottom: -83px;

  background-color: #d0e6a5;
  border-radius: 10px;

  span {
    font-weight: 400;
  }
`;
export default TodosModal;
