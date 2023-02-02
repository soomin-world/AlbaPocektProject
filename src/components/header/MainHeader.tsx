import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getNotificationsCnt } from "../../APIs/alertApi";

function MainHeader() {
  const navigate = useNavigate();
  const {
    data: count,
    isLoading: cntLoading,
    refetch: cntRefetch,
  } = useQuery(["getNotificationsCnt"], () => getNotificationsCnt());
  console.log("안 읽은 알림 개수", count?.count);

  return (
    <STHeader>
      <img
        src="/image/iconLogo.svg"
        alt="logo"
        className="logo"
        onClick={() => navigate("/")}
      />
      <div className="nav">
        <img
          src="/image/iconChat.svg"
          alt="채팅"
          onClick={() => navigate("/chat")}
        />
        <img
          src="/image/iconMypage.svg"
          alt="마이페이지"
          onClick={() => navigate("/mypage")}
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
}

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
      right: -2px;
      width: 4px;
      height: 4px;
    }
  }
  .logo {
    width: 90px;
    height: 25px;
    cursor: pointer;
  }
`;

export default MainHeader;
