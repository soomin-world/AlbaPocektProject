import styled from "styled-components";
import ChatRoomCard from "../components/chat/ChatRoomCard";
import Footer from "../components/footer/Footer";
import ChatHeader from "../components/header/ChatHeader";
import LayOut from "../components/layout/LayOut";

const ChatList = () => {
  return (
    <LayOut>
      <STContainer>
        <ChatHeader title={"채팅"} />
        <ChatRoomCard />
        <Footer />
      </STContainer>
    </LayOut>
  );
};

const STContainer = styled.div``;

export default ChatList;
