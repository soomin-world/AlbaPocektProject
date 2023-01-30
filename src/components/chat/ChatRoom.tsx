import styled from "styled-components";
import ChatHeader from "../header/ChatHeader";
import LayOut from "../layout/LayOut";
import Chat from "./Chat";

function ChatRoom() {
  return (
    <LayOut>
      <STContainer>
        <ChatHeader title={"상대id"} arrow={true} menu={true} />
        <STChatList>
          <div>오후 10:30분</div>
          <Chat />
        </STChatList>
        <STInputFooter>
          <input placeholder="메세지를 입력하세요" type="text" />
          <img src="/image/icon-arrow-right-circle-mono.svg" alt="전송버튼" />
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
  //border: 1px solid black;
  width: 90%;
  height: 44px;
  position: fixed;
  bottom: 10px;
  border: 1px solid #efefef;
  display: flex;
  align-items: center;
  background-color: #f9f9f9;

  img {
    width: 24px;
    height: 24px;
  }
  input {
    width: 90%;
    border: none;
    height: 100%;
    font-weight: 400;
    font-size: 15px;
    line-height: 22px;
    padding: 10px;
    background-color: #f9f9f9;
  }
`;
export default ChatRoom;
