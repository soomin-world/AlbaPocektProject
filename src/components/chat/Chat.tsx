//import * as StompJs from "@stomp/stompjs";
import { Client, Message, Stomp } from "@stomp/stompjs";
import { Children, useEffect } from "react";
import SockJS from "sockjs-client";
import styled from "styled-components";
import ChatList from "../../pages/ChatList";

export type ChatType = {
  message: string;
  sender?: string | null;
  profileImage?: string;
  createdAt: string;
};

const Chat: React.FC<ChatType> = ({
  message,
  sender,
  profileImage,
  createdAt,
}) => {
  const me = localStorage.getItem("nickname");
  const timeToKor = (t: string) => {
    return t.slice(11, 16);
  };
  //console.log(timeToKor(createdAt));
  return (
    <>
      {sender === me ? (
        <STMe>
          <STBody>
            <div className="time">
              <div>{timeToKor(createdAt)}</div>
            </div>
            <ChatPiece backGround="#5FCE80" color="white">
              {message}
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
            <div className="time">
              <div>{timeToKor(createdAt)}</div>
            </div>
          </STBody>
        </STOther>
      )}
    </>
  );
};

const STOther = styled.div`
  display: flex;
`;
const STMe = styled.div`
  display: flex;
  justify-content: flex-end;
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
  flex-direction: row;
  max-width: 70%;
  .time {
    width: 50px;
    padding: 7px;
    display: flex;
    flex-direction: column-reverse;
    div {
      font-size: 10px;
    }
  }
`;

const ChatPiece = styled.div<{ backGround?: string; color?: string }>`
  //border: 1px solid black;
  padding: 7px;
  background-color: ${(props) => props.backGround || "#F2F4F6"};
  color: ${(props) => props.color || "black"};
  display: flex;
  align-items: center;
  border-radius: 8px;
  min-height: 36px;
  font-size: 13px;
  margin-bottom: 10px;
`;

export default Chat;
