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
  border: 1px solid black;
`;
export default DropDown;
