import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ChatRoomCard from "../components/chat/ChatRoomCard";
import ChatHeader from "../components/header/ChatHeader";
import LayOut from "../components/layout/LayOut";

const ChatList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state?.id;
  console.log(id);

  const onArrowClick = () => {
    if (id) {
      navigate("/");
    } else {
      navigate(-1);
    }
  };

  return (
    <LayOut height="100vh">
      <STContainer>
        {/* <ChatHeader
          title={"채팅"}
          arrow={true}
          location={id ? id : undefined}
          margin="125px"
        /> */}
        <STHeader>
          <div className="wrap">
            <img
              src="/image/iconLeftArrow.svg"
              alt="<"
              onClick={onArrowClick}
            />
            <h1>채팅</h1>
          </div>
        </STHeader>
        <ChatRoomCard />
      </STContainer>
    </LayOut>
  );
};

const STContainer = styled.div`
  margin-top: 50px;
`;

const STHeader = styled.div`
  position: fixed;
  width: 345px;
  top: 0;
  display: flex;
  justify-content: space-between;
  margin: px 0px 10px 0px;
  align-items: center;
  height: 50px;
  background-color: white;
  .wrap {
    display: flex;
    img {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
    h1 {
      //width: 83px;
      height: 25px;
      font-size: 20px;
      font-weight: 500;
      margin-left: 130px;
    }
  }
  .icons {
  }
`;

export default ChatList;
