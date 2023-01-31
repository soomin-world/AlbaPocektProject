import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  getNotifications,
  notificationDelete,
  notificationDeleteAll,
  notificationRead,
} from "../../APIs/alertApi";
// import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";

const MyAlert = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("is_login");
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, refetch } = useQuery(["getNotifications"], () =>
    getNotifications()
  );
  console.log(data);
  const { mutateAsync: readNoti } = useMutation(notificationRead);
  const { mutateAsync: deleteNoti } = useMutation(notificationDelete);
  const { mutateAsync: deleteAllNoti } = useMutation(notificationDeleteAll);
  // const eventSource = new EventSource("https://woooo.shop/subscribe", {
  //   headers: {
  //     Authorization: token,
  //   },
  // });

  // eventSource.onmessage = (event) => {
  //   const data = JSON.parse(event.data);
  //   console.log(data.message);
  // };

  return (
    <Total>
      <Alert
        onClick={() => {
          setIsOpen(!isOpen);
          refetch();
        }}
      >
        알림
      </Alert>
      {isOpen ? (
        <AlertList>
          {data.map((alert: any) => {
            return (
              <>
                <div>
                  <span
                    onClick={() => {
                      navigate(`post/${alert.url.slice(-3)}`);
                      readNoti(alert.id);
                    }}
                  >
                    {alert.content}
                  </span>
                  <button
                    onClick={() => {
                      deleteNoti(alert.id);
                      refetch();
                    }}
                  >
                    X
                  </button>
                </div>
              </>
            );
          })}

          <button
            onClick={() => {
              deleteAllNoti().then((res) => refetch());
            }}
          >
            전체 삭제
          </button>
        </AlertList>
      ) : null}
    </Total>
  );
};

const Total = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const Alert = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #5fce80;
  position: fixed;
  bottom: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const AlertList = styled.div`
  width: 200px;
  height: 200px;
  background-color: white;
  position: fixed;
  bottom: 170px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  overflow: auto;

  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }
  div {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    border-bottom: 1px solid black;
    font-size: 13px;

    &:last-child {
      border: none;
    }
  }
`;

export default MyAlert;
