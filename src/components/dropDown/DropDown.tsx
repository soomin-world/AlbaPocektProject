import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { deleteWork } from "../../APIs/workApi";

interface propsType {
  id: number;
  open: boolean;
  close: () => void;
}

const DropDown: React.FC<propsType> = ({ id, open, close }) => {
  const queryClient = useQueryClient();
  const mutateDelete = useMutation(deleteWork, {
    onSuccess: () => {
      queryClient.invalidateQueries(["work"]);
    },
  });
  const deleteHandler = () => {
    mutateDelete.mutate(id);
  };
  return (
    <STDropdown>
      <li>
        <a href={`/addWork/${id}`}>수정</a>
      </li>
      <li>
        <div onClick={deleteHandler}>삭제</div>
      </li>
    </STDropdown>
  );
};

const STDropdown = styled.div`
  position: fixed;
  z-index: 999;
  border-radius: 8px;
  padding: 5px;
  background-color: #e1f4e0;
  color: #8f8b8b;
  margin-top: -2px;
  width: 50px;
  height: 60px;
  animation: modal-bg-show 0.6s;
  border: 1px solid white;

  li {
    display: flex;
    justify-content: center;
    list-style: none;
    margin-top: 5px;
    font-size: 13px;
    font-weight: 500;
  }
  div {
    cursor: pointer;
  }
`;
export default DropDown;
