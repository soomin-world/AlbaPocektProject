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

  const setIsWorkplaceBtns = useSetRecoilState(workplaceBtnsAtom);
  const { data, isLoading, isError } = useQuery(["workList"], () => getWorks());

  const workList = data?.data.workList;

  return ReactDOM.createPortal(
    <div>
      <Overlay
        onClick={() => {
          setIsWorkplaceBtns(false);
        }}
      ></Overlay>
      <Modal>
        {/* <Button color="none">
          <span className="date">
            {id?.slice(4, 6)}.{id?.slice(6, 8)}
          </span>
        </Button> */}
        {workList?.map((work: WorkType) => {
          return (
            <Button
              onClick={() => {
                navigate(`/addShift/${work.placeId}/${id}`);
                setIsWorkplaceBtns(false);
              }}
              color={work.placeColor}
            >
              <div></div>
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
  width: 170px;
  /* position: fixed;
  left: 0;
  right: 0;
  bottom: 40%; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

const Button = styled.div<{ color: string }>`
  height: 54px;
  display: flex;
  align-items: center;
  font-size: 16px;
  border-bottom: 1px solid #d9d9d9;
  font-weight: 500;
  color: #545456;
  padding-left: 15px;

  span {
    height: 16px;
  }
  /* &:first-child {
    height: 45px;
    color: black;
    justify-content: center;
  } */
  &:last-child {
    border: none;
  }
  .date {
    font-size: 16px;
    font-weight: 500;
  }
  div {
    width: 8px;
    height: 8px;
    background-color: ${(props) => props.color};
    margin-right: 10px;
  }
`;

export default WorkplaceBtnsModal;
