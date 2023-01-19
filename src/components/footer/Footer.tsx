import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";

function Footer() {
  const navigate = useNavigate();
  const mainMatch = useMatch("/");
  const calMatch = useMatch("/calendar");
  const comMatch = useMatch("/board");

  return (
    <STContainer>
      {mainMatch ? (
        <img
          src="/image/iconHomeGreen.png"
          alt="홈"
          onClick={() => navigate("/")}
        />
      ) : (
        <img src="/image/iconHome.png" alt="홈" onClick={() => navigate("/")} />
      )}

      {calMatch ? (
        <img
          src="/image/iconCalGreen.png"
          alt="캘린더"
          onClick={() => navigate("/calendar")}
          style={{ marginLeft: "17px" }}
        />
      ) : (
        <img
          src="/image/iconCal.png"
          alt="캘린더"
          onClick={() => navigate("/calendar")}
          style={{ marginLeft: "17px" }}
        />
      )}

      {comMatch ? (
        <img
          src="/image/iconComGreen.png"
          alt="커뮤니티"
          onClick={() => navigate("/board")}
        />
      ) : (
        <img
          src="/image/iconCom.png"
          alt="커뮤니티"
          onClick={() => navigate("/board")}
        />
      )}
    </STContainer>
  );
}

const STContainer = styled.div`
  position: fixed;
  right: 0px;
  bottom: -50px;
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: space-around;
  transform: translateY(-100%);
  background-color: white;
  box-shadow: 0px -5px 15px rgba(0, 0, 0, 0.2);
  /* border-radius: 20px; */
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 10px;
  div {
    font-size: 30px;
    cursor: pointer;
  }
`;
export default Footer;
