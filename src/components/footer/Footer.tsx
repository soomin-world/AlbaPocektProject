import {
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import styled from "styled-components";

function Footer() {
  const navigate = useNavigate();
  const locationNow = useLocation();
  const mainMatch = useMatch("/");
  const calMatch = useMatch("/calendar");
  const comMatch = useMatch("/board");
  const comDetailMatch = useMatch("/post/:id");
  const chartMatch = useMatch("/chart");
  const searchMatch = useMatch("/search");
  const { id } = useParams();

  if (locationNow.pathname === "/login") return null;
  if (locationNow.pathname === "/register") return null;
  // if (locationNow.pathname === "/mypage") return null;
  // if (locationNow.pathname === "/mypage/myLike") return null;
  if (locationNow.pathname === "/mypage/myComment") return null;
  if (locationNow.pathname === "/mypage/edit") return null;
  if (locationNow.pathname === "/alert") return null;
  if (locationNow.pathname === "/loading") return null;
  if (locationNow.pathname.slice(0, 6) === "/oauth") return null;
  if (locationNow.pathname.slice(0, 6) === "/chat/") return null;
  // if (locationNow.pathname.slice(0, 5) === "/chat") return null;
  if (window.location.pathname.slice(0, 8) === "/posting") return null;
  if (window.location.pathname.slice(0, 8) === "/addwork") return null;
  if (window.location.pathname.slice(0, 9) === "/addShift") return null;
  if (window.location.pathname.slice(0, 10) === "/editShift") return null;

  return (
    <Wrap>
      <STContainer>
        {mainMatch ? (
          <img
            src="/image/iconHomeFull.svg"
            alt="홈"
            onClick={() => navigate("/")}
          />
        ) : (
          <img
            src="/image/iconHome.svg"
            alt="홈"
            onClick={() => navigate("/")}
          />
        )}

        {calMatch ? (
          <img
            src="/image/iconCalFull.svg"
            alt="캘린더"
            onClick={() => navigate("/calendar")}
            style={{ marginLeft: "17px" }}
          />
        ) : (
          <img
            src="/image/iconCal.svg"
            alt="캘린더"
            onClick={() => navigate("/calendar")}
            style={{ marginLeft: "17px" }}
          />
        )}

        {comMatch || comDetailMatch || searchMatch ? (
          <img
            src="/image/iconComFull.svg"
            alt="커뮤니티"
            onClick={() => navigate("/board")}
          />
        ) : (
          <img
            src="/image/iconCom.svg"
            alt="커뮤니티"
            onClick={() => navigate("/board")}
          />
        )}

        {chartMatch ? (
          <img
            src="/image/Group 241.svg"
            alt="통계"
            onClick={() => navigate("/chart")}
          />
        ) : (
          <img
            src="/image/Group 240.svg"
            alt="통계"
            onClick={() => navigate("/chart")}
          />
        )}
      </STContainer>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  justify-content: center;
`;

const STContainer = styled.div`
  position: fixed;
  bottom: 0px;
  display: flex;
  width: 375px;
  height: 55px;
  justify-content: space-around;
  // transform: translateY(-100%);
  background-color: white;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  /* border-radius: 20px; */
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 10px;

  img {
    cursor: pointer;
  }
  div {
    font-size: 30px;
    cursor: pointer;
  }
`;
export default Footer;
