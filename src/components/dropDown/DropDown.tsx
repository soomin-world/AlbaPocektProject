import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { deleteWork } from "../../APIs/workApi";

interface propsType {
  id: number;
}

const DropDown: React.FC<propsType> = ({ id }) => {
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
  position: relative;
  z-index: 999;
  border-radius: 20%;
  padding: 5px;
  background-color: rgba(253, 251, 251, 0.6);
  color: black;
  li {
    margin-top: 5px;
    font-size: 5px;
  }
`;
export default DropDown;
