import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function MainHeader() {
  const navigate = useNavigate();
  return (
    <STHeader>
      <img
        src="/image/Logo.png"
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
      </div>
    </STHeader>
  );
}

const STHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 20px 20px 20px;
  .nav {
    gap: 15px;
    display: flex;
    height: 24px;
    width: 63px;
    cursor: pointer;
  }
  .logo {
    width: 39px;
    height: 19px;
    cursor: pointer;
  }
`;

export default MainHeader;
