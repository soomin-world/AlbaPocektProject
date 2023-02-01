//import * as StompJs from "@stomp/stompjs";
import { Client, Message, Stomp } from "@stomp/stompjs";
import { Children, useEffect } from "react";
import SockJS from "sockjs-client";
import styled from "styled-components";
import ChatList from "../../pages/ChatList";
import { IPayload } from "./ChatRoom";

export type ChatType = {
  message: string;
  nickname: string;
  profileImage: string;
};

type IsMe = {
  me: boolean;
};

const Chat: React.FC<ChatType> = ({ message, nickname, profileImage }) => {
  const me = localStorage.getItem("nickname");
  return (
    <>
      {nickname === me ? (
        <STMe>
          <STBody>
            <ChatPiece backGround="#5FCE80" color="white">
              {message}{" "}
            </ChatPiece>
          </STBody>
        </STMe>
      ) : (
        <STOther>
          <STProfile>
            <img src={profileImage} alt="프로필사진" />
          </STProfile>
          <STBody>
            <ChatPiece>{message}</ChatPiece>
          </STBody>
        </STOther>
      )}

      {/* <STMe>
        <STBody>
          <ChatPiece>aptpwl </ChatPiece>
        </STBody>
      </STMe>
      <STOther>
        <STProfile>
          <img src="/image/댓글 예시.jpeg" alt="프로필사진" />
        </STProfile>
        <STBody>
          <ChatPiece>aptpwl</ChatPiece>
        </STBody>
      </STOther> */}
    </>
  );
};

const STOther = styled.div`
  display: flex;
  //justify-content: flex-end;
  //border: 1px solid black;
`;
const STMe = styled.div`
  display: flex;
  justify-content: flex-end;
  //border: 1px solid black;
`;

const STProfile = styled.div`
  width: 50px;
  height: 50px;
  img {
    width: 36px;
    height: 36px;
    border-radius: 100%;
    object-fit: cover;
  }
`;

const STBody = styled.div`
  //border: 1px solid black;
  display: flex;
  flex-direction: column;
  max-width: 70%;
  div {
  }
`;

const ChatPiece = styled.div<{ backGround?: string; color?: string }>`
  width: 100%;
  padding: 7px;
  background-color: ${(props) => props.backGround || "#F2F4F6"};
  color: ${(props) => props.color || "black"};
  display: flex;
  align-items: center;
  border-radius: 8px;
  width: 100%;
  min-height: 36px;
  font-size: 13px;
  margin-bottom: 10px;
`;

export default Chat;
