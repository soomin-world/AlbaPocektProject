import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TodosModal = ({ children, onClose }: any) => {
  const navigate = useNavigate();
  //   const handleClose = () => {
  //     onClose?.();
  //   };

  return ReactDOM.createPortal(
    <>
      <Overlay
        onClick={() => {
          navigate("/calendar");
        }}
      ></Overlay>
      <Modal>
        <div>{children}</div>
        <div>my modal</div>
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

export default TodosModal;
