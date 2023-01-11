import ReactDOM from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { moreBtnsAtom } from "../../atoms";

const MoreBtnsModal = ({ children }: any) => {
  const navigate = useNavigate();
  const setIsMoreBtns = useSetRecoilState(moreBtnsAtom);

  return ReactDOM.createPortal(
    <>
      <Overlay
        onClick={() => {
          setIsMoreBtns(false);
        }}
      ></Overlay>
      <Modal>
        <Button>
          <span>수정</span>
        </Button>
        <Button>
          <span>삭제</span>
        </Button>
      </Modal>
    </>,
    document.getElementById("modal") as Element
  );
};

const Modal = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;

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

const Button = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;

  span {
    height: 15px;
  }

  &:first-child {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }

  &:last-child {
    color: red;
    font-weight: 400;
  }
`;
export default MoreBtnsModal;
