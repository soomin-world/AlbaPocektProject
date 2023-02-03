import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  getNotifications,
  getNotificationsCnt,
  notificationDelete,
  notificationDeleteAll,
  notificationRead,
} from "../APIs/alertApi";
import LayOut from "../components/layout/LayOut";

const Alert = () => {
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useQuery(["getNotifications"], () =>
    getNotifications()
  );
  const {
    data: count,
    isLoading: cntLoading,
    refetch: cntRefetch,
  } = useQuery(["getNotificationsCnt"], () => getNotificationsCnt());

  console.log("받아온 알림", data);
  console.log("안 읽은 알림 개수", count?.count);

  const { mutateAsync: readNoti } = useMutation(notificationRead);
  const { mutateAsync: deleteNoti } = useMutation(notificationDelete);
  const { mutateAsync: deleteAllNoti } = useMutation(notificationDeleteAll);

  return (
    <LayOut height="100vh">
      <div>알림 페이지</div>
      {data && !cntLoading ? (
        <>
          <div>{count?.count}개의 안 읽은 알림이 존재합니다!</div>
          {data.map((alert: any) => {
            return (
              <>
                <div>
                  <AlertListMsg
                    onClick={() => {
                      // navigate(`/post/${alert.url.slice(-3)}`);
                      readNoti(alert.id).then((res) => {
                        console.log("읽음 성공!");
                        navigate(`/post/${alert.url.slice(-3)}`);
                      });
                    }}
                    fontColor={alert.status}
                  >
                    {alert.content}
                  </AlertListMsg>
                  <button
                    onClick={() => {
                      deleteNoti(alert.id).then((res) => {
                        console.log("삭제 성공");
                        refetch();
                      });
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
              deleteAllNoti().then((res) => {
                console.log("전체 삭제 성공");
                refetch();
              });
            }}
          >
            전체 삭제
          </button>
        </>
      ) : null}
    </LayOut>
  );
};

const AlertList = styled.div`
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

const AlertListMsg = styled.span<{ fontColor: Boolean }>`
  color: ${(props) => (props.fontColor ? "#AEAEAE" : "black")};
`;

export default Alert;
