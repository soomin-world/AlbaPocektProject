//import * as StompJs from "@stomp/stompjs";
import { Client, Message, Stomp } from "@stomp/stompjs";
import { Children, useEffect, useState } from "react";
import SockJS from "sockjs-client";
import styled from "styled-components";
import ChatList from "../../pages/ChatList";

export type ChatType = {
  message: string;
  sender?: string | null;
  profileImage?: string;
  createdAt: string;
  readUser: boolean;
};

const Chat: React.FC<ChatType> = ({
  message,
  sender,
  profileImage,
  createdAt,
  readUser,
}) => {
  const me = localStorage.getItem("nickname");
  const [isRead, setIsRead] = useState(false);
  const timeToKor = (t: string) => {
    return t.slice(11, 16);
  };
  useEffect(() => {
    if (readUser) {
      setIsRead(true);
    } else {
      setIsRead(false);
    }
  }, [readUser]);

  return (
    <>
      {sender === me ? (
        <STMe>
          <STBody>
            <div className="wrap">
              <div className="isRead">
                {isRead ? <div></div> : <div>1</div>}
              </div>
              <div className="createdat">
                <div>{timeToKor(createdAt)}</div>
              </div>
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
            <div className="wrap">
              <div className="isRead">
                <div></div>
              </div>
              <div className="createdat">
                <div>{timeToKor(createdAt)}</div>
              </div>
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
  margin-bottom: 5px;
  .wrap {
    height: 70%;
    display: flex;
    flex-direction: column;
    .createdat {
      //border: 1px solid black;
      width: 50px;
      display: flex;
      margin-top: 5px;
      flex-direction: column;
      align-items: center;
      //margin-bottom: 5px;
      div {
        font-size: 10px;
      }
    }
    .isRead {
      margin-left: 10px;
      width: 30px;
      min-height: 50%;
      margin-top: 3px;
      //border: 1px solid black;
      display: flex;
      justify-content: end;
      font-size: 10px;
      color: #5fce80;
    }
  }
`;

const ChatPiece = styled.div<{ backGround?: string; color?: string }>`
  height: 90%;
  //border: 1px solid black;
  padding: 7px;
  background-color: ${(props) => props.backGround || "#F2F4F6"};
  color: ${(props) => props.color || "black"};
  display: flex;
  align-items: center;
  border-radius: 8px;
  //min-height: 36px;
  font-size: 13px;
  margin-bottom: 10px;
`;

export default Chat;
