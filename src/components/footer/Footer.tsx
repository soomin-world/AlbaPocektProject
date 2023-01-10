import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Footer() {
  const navigate = useNavigate();
  return (
    <STContainer>
      <img src="/iconHome.png" alt="홈" onClick={() => navigate("/")} />
      <img src="/iconCal.png" alt="캘린더" />
      <img
        src="/iconCommunity.png"
        alt="커뮤니티"
        onClick={() => navigate("/board")}
      />
    </STContainer>
  );
}

const STContainer = styled.div`
  position: fixed;
  right: 0px;
  bottom: 0px;
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: space-around;
  transform: translateY(-100%);
  background-color: grey;
  padding: 10px;
  div {
    font-size: 30px;
    cursor: pointer;
  }
`;
export default Footer;
