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

  console.log("받아온 알림", data);
  console.log("안 읽은 알림 개수", count?.count);

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
        title={"알림"}
        padding="0 3% 0 3%"
        option={deleteAllHandler}
        button="전체삭제"
        marginLeft="135px"
      />
      {/* <div>알림 페이지</div> */}
      {data && !cntLoading ? (
        <>
          <UnRead>
            {count?.count === 0
              ? "알림을 모두 읽었습니다!"
              : `${count?.count}개의 안 읽은 알림이 존재합니다!`}
          </UnRead>
          {data.map((alert: any) => {
            return (
              <MsgBox>
                <MsgTop>
                  <div>게시판</div>
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
                {/* <button
                  onClick={() => {
                    deleteNoti(alert.id).then((res) => {
                      console.log("삭제 성공");
                      refetch();
                      cntRefetch();
                    });
                  }}
                >
                  X
                </button> */}
              </MsgBox>
            );
          })}

          {/* <button
            onClick={() => {
              deleteAllNoti().then((res) => {
                console.log("전체 삭제 성공");
                refetch();
                cntRefetch();
              });
            }}
          >
            전체 삭제
          </button> */}
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

const MsgBox = styled.div`
  padding: 4% 4.5% 4% 4.5%;
  border-bottom: 1px solid #d9d9d9;
`;

const MsgTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    font-size: 10px;
    font-weight: 500;
    color: #5fce80;
  }
`;
const Msg = styled.span<{ fontColor: Boolean }>`
  color: ${(props) => (props.fontColor ? "#AEAEAE" : "black")};
  font-size: 15px;
  font-weight: 400;
`;

const UnRead = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d9d9d932;
  font-size: 15px;
  font-weight: 400;
`;

export default Alert;
