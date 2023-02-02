import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function MainHeader() {
  const navigate = useNavigate();
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
          alt="마이페이지"
          onClick={() => navigate("/alert")}
        />
      </div>
    </STHeader>
  );
}

const STHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 18px 20px 18px;
  .nav {
    gap: 15px;
    display: flex;
    height: 24px;
    // width: 63px;
    cursor: pointer;

    img:last-child {
      width: 20px;
      height: 20px;
      margin-top: 2px;
    }
  }
  .logo {
    width: 90px;
    height: 25px;
    cursor: pointer;
  }
`;

export default MainHeader;
