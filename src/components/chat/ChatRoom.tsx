import { IMessage, Stomp } from "@stomp/stompjs";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import SockJS from "sockjs-client";
import styled from "styled-components";
import { baseURL } from "../../APIs/axios";
import { getDetailChat } from "../../APIs/chatApi";
import { otherNickName } from "../../atoms";
import ChatHeader from "../header/ChatHeader";
import LayOut from "../layout/LayOut";
import Chat, { ChatType } from "./Chat";

export type IPayload = {
  roomId: string | undefined;
  sender: string | null;
  message: string;
  type: string;
};

function ChatRoom() {
  const { id } = useParams();
  const otherName = useRecoilValue(otherNickName);
  const myNickName = localStorage.getItem("nickname");
  const [message, setMessage] = useState("");
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    connectStomp();
    getDetailChat(id).then((res: AxiosResponse<any, any>) => {
      const data = res.data;
      setChatList(data);
    });
  }, []);
  console.log(chatList);
  const url = baseURL;
  const sock = new SockJS(url + "/ws/chat");
  const client = Stomp.over(sock);

  const connectStomp = () => {
    client.connect({ myNickName }, onConnect, onError);
    client.debug = () => console.log();
    //client.activate();
  };
  const onError = () => {
    console.log("에러에요 ");
  };
  const onConnect = () => {
    client.subscribe(`/sub/chat/room/${id}`, onMessageRecieve);
    userEnter();

    console.log(chatList);
  };

  const onMessageRecieve = (e: IMessage) => {
    let data = JSON.parse(e.body);
    console.log(data);
    if (data.type === "talk") {
      getDetailChat(id).then((res: AxiosResponse) => {
        setChatList(res.data);
      });
    }
  };

  const userEnter = () => {
    let payload = {
      type: "ENTER",
      roomId: id,
      sender: myNickName,
      message: "입장",
    };
    client.send(
      `/pub/api/chat/message`,
      { myNickName },
      JSON.stringify(payload)
    );
    console.log("유저입장");
  };

  const sendMessage = () => {
    console.log(typeof message);
    console.log(message);
    let payload = {
      type: "TALK",
      roomId: id,
      sender: myNickName,
      message: message,
    };

    // client.publish({
    //   destination: `/pub/api/chat/message`,
    //   body: JSON.stringify(payload),
    // });

    client.send(
      `/pub/api/chat/message`,
      { myNickName },
      JSON.stringify(payload)
    );
    console.log("메세지 전송");
  };

  const enterMessage = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    sendMessage();
  };
  console.log(message);
  return (
    <LayOut height={"100vh"}>
      <STContainer>
        <ChatHeader title={otherName} arrow={true} menu={true} />
        <STChatList>
          <div className="작성시간">오후 10시</div>
          {chatList.map((c: ChatType, i) => {
            return (
              <Chat
                key={i}
                message={c.message}
                nickname={c.nickname}
                profileImage={c.profileImage}
              />
            );
          })}
        </STChatList>
        <STInputFooter>
          <input
            className="chat_input"
            type="text"
            placeholder="메세지를 입력하세요"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <img
            src="/image/icon-arrow-right-circle-mono.svg"
            alt="전송"
            onClick={(e) => enterMessage(e)}
          />
        </STInputFooter>
      </STContainer>
    </LayOut>
  );
}

const STContainer = styled.div`
  width: 100%;
`;
const STChatList = styled.div`
  display: flex;
  flex-direction: column;
`;
const STInputFooter = styled.form`
  //border: 1px solid black;
  width: 48%;
  height: 44px;
  position: fixed;
  bottom: 5px;
  border-radius: 8px;
  border: 1px solid #efefef;
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  button {
    width: 24px;
    height: 24px;
    border-radius: 100%;
    border: none;
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

const ChatPiece = styled.div`
  width: 100%;
  padding: 7px;
  background-color: #f2f4f6;
  display: flex;
  align-items: center;
  border-radius: 8px;
  width: 100%;
  min-height: 36px;
  font-size: 13px;
  margin-bottom: 10px;
`;

export default ChatRoom;
