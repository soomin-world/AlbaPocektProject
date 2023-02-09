import { FrownOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { deleteTodo, getDaily } from "../../APIs/calendarApi";
import { deletePost } from "../../APIs/detailPostApi";
import { deleteWork } from "../../APIs/workApi";
import { ITodos } from "../../types/calendar";

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
  const navigate = useNavigate();
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
      queryClient.invalidateQueries(["todos"]);
      queryClient.invalidateQueries(["bonus"]);
      queryClient.invalidateQueries(["totalWage"]);
    },
  });

  const { confirm } = Modal;
  const showConfirm = (value: (() => {}) | undefined) => {
    confirm({
      title: "삭제",
      icon: <FrownOutlined />,
      content: "정말 삭제하시겠습니까?",
      onOk() {
        if (value) {
          let temp = value;
          value();
        }
      },
      onCancel() {},
      okText: "네",
      cancelText: "아니요!",
      centered: true,
      okButtonProps: { danger: true, type: "text" },
      cancelButtonProps: { type: "text" },
    });
  };

  const deletePostHandler = () => {
    mutatePostDelete.mutateAsync(id).then(() => {
      setIsOpen(false);
      navigate("/board");
    });
  };

  const deleteWorkHandler = () => {
    mutateDelete.mutateAsync(id).then(() => setIsOpen(false));
  };

  const deleteShiftHandler = () => {
    mutateAsync(String(id)).then(() => setIsOpen(false));
  };

  console.log(value);
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
        <div className="delete" onClick={() => showConfirm(value)}>
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
