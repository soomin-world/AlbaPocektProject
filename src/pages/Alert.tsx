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
import Header from "../components/header/Header";
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

  // console.log("받아온 알림", data);
  // console.log("안 읽은 알림 개수", count?.count);
  // console.log(data);
  const { mutateAsync: readNoti } = useMutation(notificationRead);
  const { mutateAsync: deleteNoti } = useMutation(notificationDelete);
  const { mutateAsync: deleteAllNoti } = useMutation(notificationDeleteAll);

  const deleteAllHandler = () => {
    deleteAllNoti().then((res) => {
      console.log("전체 삭제 성공");
      refetch();
      cntRefetch();
    });
  };

  return (
    <LayOut padding="0" position="relative" height="100vh">
      <Header
        title="알림"
        padding="0 3% 0 3%"
        option={deleteAllHandler}
        button="전체삭제"
        marginLeft="135px"
      />

      {data && !cntLoading ? (
        <>
          <UnRead>
            <div>
              {count?.count === 0
                ? "알림을 모두 읽었습니다!"
                : `${count?.count}개의 안 읽은 알림이 존재합니다!`}
            </div>
          </UnRead>
          <MsgList>
            {data.map((alert: any) => {
              return (
                <MsgBox key={alert.id}>
                  <MsgTop fontColor={alert.status}>
                    <div>
                      {alert.type === "FREEPOST"
                        ? "자유게시판"
                        : alert.type === "PARTTIMEPOST"
                        ? "알바고민"
                        : alert.type === "COVERPOST"
                        ? "대타게시판"
                        : alert.type === "CHAT"
                        ? "채팅"
                        : null}
                    </div>
                    <img
                      src="/image/iconLightGrayX.svg"
                      onClick={() => {
                        deleteNoti(alert.id).then((res) => {
                          console.log("삭제 성공");
                          refetch();
                          cntRefetch();
                        });
                      }}
                    />
                  </MsgTop>
                  <Msg
                    onClick={() => {
                      // navigate(`/post/${alert.url.slice(-3)}`);
                      readNoti(alert.id).then((res) => {
                        console.log("읽음 성공!");
                        navigate(`/post/${alert.url.slice(-3)}`);
                        cntRefetch();
                      });
                    }}
                    fontColor={alert.status}
                  >
                    {alert.content}
                  </Msg>
                  <MsgBottom>
                    {alert.time.slice(5, 7)}/{alert.time.slice(8, 10)}{" "}
                    {alert.time.slice(11, 16)}
                  </MsgBottom>
                </MsgBox>
              );
            })}
          </MsgList>
        </>
      ) : null}
    </LayOut>
  );
};

const MsgList = styled.div`
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const UnRead = styled.div`
  width: 100%;
  min-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d9d9d932;
  font-size: 14px;
  font-weight: 400;

  div {
    height: 15px;
    margin-bottom: 3px;
  }
`;

const MsgBox = styled.div`
  padding: 4% 4.5% 4% 4.5%;
  border-bottom: 1px solid #d9d9d9;
`;

const MsgTop = styled.div<{ fontColor: Boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    font-size: 11px;
    font-weight: 500;
    color: ${(props) => (props.fontColor ? "#5fce809b" : "#5fce80")};
  }
`;

const Msg = styled.div<{ fontColor: Boolean }>`
  color: ${(props) => (props.fontColor ? "#AEAEAE" : "black")};
  font-size: 15px;
  font-weight: 400;
  margin: 5px 0px 10px 0px;
  cursor: pointer;
`;

const MsgBottom = styled.div`
  font-size: 11px;
  font-weight: 400;
  color: #aeaeae;
`;

export default Alert;
