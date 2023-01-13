import ReactDOM from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { moreBtnsAtom, workplaceBtnsAtom } from "../../atoms";

const WorkplaceBtnsModal = ({ children }: any) => {
  const navigate = useNavigate();
  const setIsWorkplaceBtns = useSetRecoilState(workplaceBtnsAtom);

  return ReactDOM.createPortal(
    <div>
      <Overlay
        onClick={() => {
          setIsWorkplaceBtns(false);
        }}
      ></Overlay>
      <Modal>
        <Button>
          <span>카페</span>
        </Button>
        <Button>
          <span>영화관</span>
        </Button>
        <Button>
          <span>찜질방</span>
        </Button>
      </Modal>
    </div>,
    document.getElementById("modal") as Element
  );
};

const Modal = styled.div`
  position: fixed;
  width: 150px;
  left: 0;
  right: 0;
  bottom: 40%;
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
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;

  span {
    height: 15px;
  }

  & {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }

  &:last-child {
    border: none;
  }
`;
export default WorkplaceBtnsModal;
