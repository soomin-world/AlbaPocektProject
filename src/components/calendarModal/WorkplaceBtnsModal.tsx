import { useQuery } from "@tanstack/react-query";
import ReactDOM from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { moreBtnsAtom, workplaceBtnsAtom } from "../../atoms";
import { getWorks } from "../../APIs/workApi";

export interface WorkType {
  placeName: string;
  placeColor: string;
  placeId: number;
  salaryDay: number;
}

const WorkplaceBtnsModal = ({ children }: any) => {
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(id);
  const setIsWorkplaceBtns = useSetRecoilState(workplaceBtnsAtom);
  const { data, isLoading, isError } = useQuery(["workList"], () => getWorks());
  // console.log(data?.data.workList);
  const workList = data?.data.workList;
  console.log(workList);

  return ReactDOM.createPortal(
    <div>
      <Overlay
        onClick={() => {
          setIsWorkplaceBtns(false);
        }}
      ></Overlay>
      <Modal>
        {workList?.map((work: WorkType) => {
          return (
            <Button onClick={() => navigate(`/addShift/${work.placeId}/${id}`)}>
              <span>{work.placeName}</span>
            </Button>
          );
        })}
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
