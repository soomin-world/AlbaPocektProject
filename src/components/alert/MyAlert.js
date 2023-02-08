import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { Children, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import { notificationRead } from "../../APIs/alertApi";

const AlertMsg = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MyAlert = () => {
  const navigate = useNavigate();
  const USERID = localStorage.getItem("userId");
  const [isOpen, setIsOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [notification, setNotification] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [url, setUrl] = useState("");

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  const { mutateAsync: readNoti } = useMutation(notificationRead);

  // const EventSource = EventSourcePolyfill || NativeEventSource;

  let HEADER;

  // if (token) {
  //   HEADER = {
  //     headers: {
  //       Authorization: token,
  //     },
  //   };
  // }

  // const eventSource = new EventSource(
  //   "https://woooo.shop/subscribe",

  //   {
  //     headers: {
  //       Authorization: token,
  //     },
  //   }
  // );

  useEffect(() => {
    if (!listening && USERID) {
      const eventSource = new EventSource(
        `https://woooo.shop/subscribe/${USERID}`
      );

      ///////// 소영님 코드 따라함 ////////

      eventSource.addEventListener("youjung", async (event) => {
        if (event.data.startsWith("{")) {
          console.log(
            "실시간 알림이 있을 때만 나오는 것",
            JSON.parse(event.data)
          );
          setNotification((prev) => [JSON.parse(event.data)]);
          setAlertOpen(true);
        }
        // const result = await e.data;
        // console.log(JSON.parse(result));
        // setData(result);
        setListening(true);
      });

      eventSource.onerror = async (event) => {
        if (event) {
          console.log("에러발생 시 뜨는 것");
          console.log("에러발생 시 뜨는 것", event);
          eventSource.close();
          // window.location.reload();
        }
      };
      return () => eventSource.close();
      // eventSource.addEventListener("error", function (event) {
      //   console.log("에러발생 시 뜨는 것", event);
      //   eventSource.close();
      // });

      /////////////// 원래 코드 ///////
      // eventSource.onmessage = (event) => {
      //   console.log(event);
      //   setListening(true);
      //   if (event.type === "message" && event.data.startsWith("{")) {
      //     console.log(
      //       "실시간 알림이 있을 때만 나오는 것",
      //       JSON.parse(event.data)
      //     );
      //     setNotification((prev) => [JSON.parse(event.data)]);
      //     setAlertOpen(true);
      //   }
      // };

      // eventSource.onerror = async (event) => {
      //   if (event) {
      //     eventSource.close();
      //   }
      // };
    }
  }, []);

  // console.log(notification[0]?.url.slice(1, 5));
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
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleAlertClose}
      >
        <AlertMsg
          // onClick={() => {
          //   readNoti(notification[0]?.id).then((res) =>
          //     navigate(`${notification[0]?.url}`)
          //   );
          // }}
          onClose={handleAlertClose}
          severity="success"
        >
          <div
            onClick={() => {
              if (notification[0]?.url.slice(1, 5) === "chat") {
                navigate(`${notification[0]?.url}`);
              } else {
                readNoti(notification[0]?.id).then((res) =>
                  navigate(`${notification[0]?.url}`)
                );
              }

              // readNoti(notification[0]?.id).then((res) =>
              //   navigate(`${notification[0]?.url}`)
              // );
            }}
          >
            {notification[0]?.content}
          </div>
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
