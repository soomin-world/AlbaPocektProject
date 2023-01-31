import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getNotifications } from "../../APIs/alert";
// import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";

const MyAlert = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("is_login");
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, refetch } = useQuery(["getNotifications"], () =>
    getNotifications()
  );
  console.log(data);
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
              <div
                onClick={() => {
                  navigate(`post/${alert.url.slice(-3)}`);
                }}
              >
                {alert.content}
              </div>
            );
          })}
          {/* <div>알림이 도착했어요!</div>
          <div>알림이 도착했어요!</div>
          <div>알림이 도착했어요!</div>
          <div>알림이 도착했어요!</div> */}
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
