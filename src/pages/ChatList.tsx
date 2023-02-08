import styled from "styled-components";
import ChatRoomCard from "../components/chat/ChatRoomCard";
import ChatHeader from "../components/header/ChatHeader";
import LayOut from "../components/layout/LayOut";

const ChatList = () => {
  return (
    <LayOut height="100vh">
      <STContainer>
        <ChatHeader title={"채팅"} arrow={true} location="/" margin="125px" />
        <ChatRoomCard />
      </STContainer>
    </LayOut>
  );
};

const STContainer = styled.div`
  margin-top: 50px;
`;

export default ChatList;
