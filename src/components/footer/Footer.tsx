import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Footer() {
  const navigate = useNavigate();
  return (
    <STContainer>
      <div className="home" onClick={() => navigate("/")}>
        홈
      </div>
      <div className="calendar">일정</div>
      <div className="community" onClick={() => navigate("/board")}>
        커뮤니티
      </div>
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
  div {
    font-size: 30px;
    cursor: pointer;
  }
`;
export default Footer;
