import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { deleteTodo } from "../../APIs/calendarApi";
import { deletePost } from "../../APIs/detailPostApi";
import { deleteWork } from "../../APIs/workApi";

interface propsType {
  id: number;
  open?: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  address: string;
  deleteValue: string;
}

const DropDown: React.FC<propsType> = ({
  id,
  open,
  setIsOpen,
  address,
  deleteValue,
}) => {
  const queryClient = useQueryClient();
  const { todoId } = useParams();
  const [value, setValue] = useState<() => {}>();

  const mutateDelete = useMutation(deleteWork, {
    onSuccess: () => {
      queryClient.invalidateQueries(["work"]);
    },
  });
  const mutatePostDelete = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(["post"]);
    },
  });
  const { mutateAsync } = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(["monthly"]);
      queryClient.invalidateQueries(["todos", id]);
      queryClient.invalidateQueries(["bonus"]);
      queryClient.invalidateQueries(["totalWage"]);
    },
  });

  const deletePostHandler = () => {
    mutatePostDelete.mutateAsync(id).then(() => setIsOpen(false));
    alert("삭제되었습니다!");
  };
  const deleteWorkHandler = () => {
    mutateDelete.mutateAsync(id).then(() => setIsOpen(false));
    alert("삭제되었습니다!");
  };
  const deleteShiftHandler = () => {
    mutateAsync(String(id)).then(() => setIsOpen(false));
    alert("삭제되었습니다!");
  };

  useEffect(() => {
    if (deleteValue === "post") {
      setValue(() => deletePostHandler);
    } else if (deleteValue === "shift") {
      setValue(() => deleteShiftHandler);
    } else {
      setValue(() => deleteWorkHandler);
    }
  }, [deleteValue]);

  return (
    <STDropdown>
      <li>
        <a href={address}>
          수정하기
          <img src="/image/iconPencil.svg" alt="수정" />
        </a>
      </li>
      <li>
        <div className="delete" onClick={value}>
          삭제하기 <img src="/image/iconBin.svg" alt="삭제" />
        </div>
      </li>
    </STDropdown>
  );
};

const STDropdown = styled.div`
  position: absolute;
  z-index: 999;
  padding: 5px;
  color: #8f8b8b;
  margin-top: -2px;
  margin-left: -80px;
  width: 100px;
  min-height: 64px;
  animation: modal-bg-show 0.6s;
  background: #ffffffda;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  border-radius: 8px;

  li {
    display: flex;
    justify-content: center;
    list-style: none;
    margin-top: 2px;
    font-size: 13px;
    font-weight: 500;
    img {
      width: 15px;
      height: 15px;
      margin-left: 10px;
    }
    a {
      font-weight: 400;
      font-size: 13px;
      line-height: 24px;
      color: #545456;
    }
    .delete {
      font-weight: 400;
      font-size: 13px;
      line-height: 24px;
      color: red;
    }
  }
  div {
    cursor: pointer;
  }
`;

export default DropDown;
