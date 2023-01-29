import styled from "styled-components";
import ChatHeader from "../header/ChatHeader";
import LayOut from "../layout/LayOut";

function ChatRoom() {
  return (
    <LayOut>
      <STContainer>
        <ChatHeader title={"상대id"} arrow={true} />
        <STChatList>이안에 주고받은 체팅이 들어갑니다</STChatList>
        <STInputFooter>
          <input type="text"></input>
        </STInputFooter>
      </STContainer>
    </LayOut>
  );
}

const STContainer = styled.div`
  width: 100%;
`;
const STChatList = styled.div``;
const STInputFooter = styled.div`
  border: 1px solid black;
  width: 100%;
  position: fixed;
  bottom: 0px;
`;
export default ChatRoom;
