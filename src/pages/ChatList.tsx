import styled from "styled-components";
import ChatRoomCard from "../components/chat/ChatRoomCard";
import Footer from "../components/footer/Footer";
import ChatHeader from "../components/header/ChatHeader";
import LayOut from "../components/layout/LayOut";

const ChatList = () => {
  return (
    <LayOut height="100vh">
      <STContainer>
        <ChatHeader title={"채팅"} arrow={true} />
        <ChatRoomCard />
      </STContainer>
    </LayOut>
  );
};

const STContainer = styled.div``;

export default ChatList;
