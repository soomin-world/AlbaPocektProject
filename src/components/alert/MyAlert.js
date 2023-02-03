import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { Children, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import {
  getNotifications,
  getNotificationsCnt,
  notificationDelete,
  notificationDeleteAll,
  notificationRead,
} from "../../APIs/alertApi";

const AlertMsg = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MyAlert = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("is_login");
  // console.log(token);
  const [isOpen, setIsOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [notification, setNotification] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  const { data, isLoading, refetch } = useQuery(["getNotifications"], () =>
    getNotifications()
  );
  const {
    data: count,
    isLoading: cntLoading,
    refetch: cntRefetch,
  } = useQuery(["getNotificationsCnt"], () => getNotificationsCnt());

  // console.log("받아온 알림", data);
  // console.log("안 읽은 알림 개수", count?.count);

  const { mutateAsync: readNoti } = useMutation(notificationRead);
  const { mutateAsync: deleteNoti } = useMutation(notificationDelete);
  const { mutateAsync: deleteAllNoti } = useMutation(notificationDeleteAll);

  const EventSource = EventSourcePolyfill || NativeEventSource;

  let HEADER;

  if (token) {
    HEADER = {
      headers: {
        Authorization: token,
      },
    };
  }

  // console.log(HEADER);

  // const eventSource = new EventSource(
  //   "https://woooo.shop/subscribe",

  //   {
  //     headers: {
  //       Authorization: token,
  //     },
  //   }
  // );

  useEffect(() => {
    if (!listening) {
      const eventSource = new EventSource(
        "https://woooo.shop/subscribe",
        HEADER
      );

      // eventSource.addEventListener("sse", async (e) => {
      //   console.log(e);
      //   const result = await e.data;
      //   // console.log(result);
      //   // setData(result);
      //   setListening(true);
      // });

      eventSource.onmessage = (event) => {
        console.log(event);
        setListening(true);

        if (event.type === "message" && event.data.startsWith("{")) {
          console.log(
            "실시간 알림이 있을 때만 나오는 것",
            JSON.parse(event.data)
          );
          setNotification((prev) => [JSON.parse(event.data)]);
          setAlertOpen(true);
        }
      };
    }
  }, []);

  // const eventSource = new EventSource("https://woooo.shop/subscribe", HEADER);

  // eventSource.onmessage = (event) => {
  //   console.log(event);
  //   if (event.type === "message" && event.data.startsWith("{")) {
  //     console.log("실시간 알림이 있을 때만 나오는 것", JSON.parse(event.data));
  //     setNotification((prev) => [JSON.parse(event.data)]);
  //     setAlertOpen(true);
  //   }
  // };

  // eventSource.addEventListener("error", function (e) {
  //   if (e) {
  //     eventSource.close();
  //   }
  // });

  return (
    <Total>
      {/* <Alert
        onClick={() => {
          setIsOpen(!isOpen);
          // refetch();
        }}
      >
        알림
      </Alert> */}
      {data && isOpen && !cntLoading ? (
        <AlertList>
          <div>{count?.count}개의 안 읽은 알림이 존재합니다!</div>
          {data.map((alert) => {
            return (
              <>
                <div>
                  <AlertListMsg
                    onClick={() => {
                      navigate(`post/${alert.url.slice(-3)}`);
                      readNoti(alert.id);
                    }}
                    fontColor={alert.status}
                  >
                    {alert.content}
                  </AlertListMsg>
                  <button
                    onClick={() => {
                      deleteNoti(alert.id).then((res) => refetch());
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

      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleAlertClose}
      >
        <AlertMsg onClose={handleAlertClose} severity="success">
          {notification[notification.length - notification.length]?.content}
        </AlertMsg>
      </Snackbar>
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

const AlertListMsg =
  styled.span <
  { fontColor: Boolean } >
  `
  color: ${(props) => (props.fontColor ? "#AEAEAE" : "black")};
`;

export default MyAlert;
