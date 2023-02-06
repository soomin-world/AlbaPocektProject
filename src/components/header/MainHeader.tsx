import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getNotificationsCnt } from "../../APIs/alertApi";
import { getChatCnt, getChatList } from "../../APIs/chatApi";

export type PathType = {
  location: string;
};

const MainHeader: React.FC<PathType> = ({ location }) => {
  console.log(location);
  const navigate = useNavigate();
  const {
    data: count,
    isLoading: cntLoading,
    refetch: cntRefetch,
  } = useQuery(["getNotificationsCnt"], () => getNotificationsCnt());
  const { data: totalCount, isSuccess } = useQuery(["chat"], () =>
    getChatCnt()
  );

  // useEffect(() => {
  //   setchatCnt(totalCount?.toalCount);
  // }, [isSuccess, totalCount?.totalCount]);

  return (
    <STHeader>
      <img
        src="/image/iconLogo.svg"
        alt="logo"
        className="logo"
        onClick={() => navigate("/")}
      />
      <div className="nav">
        <div className="chat">
          <img
            src="/image/iconChat.svg"
            alt="채팅"
            onClick={() => navigate("/chat")}
          />
          {totalCount?.totalCount >= 1 ? (
            <div className="chatCnt">
              <h3>{totalCount?.totalCount}</h3>
            </div>
          ) : null}
        </div>
        <img
          src="/image/iconMypage.svg"
          alt="마이페이지"
          onClick={() =>
            navigate("/mypage", {
              state: {
                location: location,
              },
            })
          }
        />
        <img
          src="/image/iconBell.svg"
          alt="알림"
          onClick={() => navigate("/alert")}
        />
        {count?.count >= 1 ? (
          <img
            src="/image/iconRedAlert.svg"
            alt="알림"
            onClick={() => navigate("/alert")}
            className="redAlert"
          />
        ) : null}
        {/* <img
          src="/image/iconRedAlert.svg"
          alt="알림"
          onClick={() => navigate("/alert")}
          className="redAlert"
        /> */}
      </div>
    </STHeader>
  );
};

const STHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 18px 20px 18px;
  .nav {
    position: relative;
    gap: 15px;
    display: flex;
    height: 24px;
    // width: 63px;
    cursor: pointer;

    img:nth-child(3) {
      width: 20px;
      height: 20px;
      margin-top: 2px;
    }
    .redAlert {
      position: absolute;
      right: -4px;
      width: 5px;
      height: 5px;
    }
    .chat {
      display: flex;
      img {
        width: 24px;
        height: 24px;
      }
      .chatCnt {
        width: 15px;
        height: 15px;
        border-radius: 100%;
        background-color: #ff4000;
        color: white;
        font-weight: 500;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        left: 15px;
        top: -7px;
        font-size: 10px;
      }
    }
  }
  .logo {
    width: 90px;
    height: 25px;
    cursor: pointer;
  }
`;

export default MainHeader;
