import { IMessage } from "@stomp/stompjs";
import { AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";
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
import stompJS from "stompjs";

export type IPayload = {
  roomId: string | undefined;
  sender: string | null;
  message: string;
  type: string;
};

export type IMychat = {
  message: string;
};

function ChatRoom() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const [other, setOther] = useState("");
  const otherName = useRecoilValue(otherNickName);
  const myNickName = localStorage.getItem("nickname");
  const [message, setMessage] = useState("");
  const [chatList, setChatList] = useState([]);
  const [myChat, setMyChat] = useState<IMychat[]>([]);
  useEffect(() => {
    connectStomp();
    scrollToBot();
  }, [otherName]);

  const url = baseURL;
  const sock = new SockJS(url + "/ws/chat");
  const client = stompJS.over(sock);
  const scrollToBot = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };
  const connectStomp = () => {
    client.connect({ myNickName }, onConnect, onError);
    //client.debug = () => console.log();
    //client.activate();
  };
  const onError = () => {
    console.log("에러에요 ");
  };
  const onConnect = () => {
    client.subscribe(`/sub/chat/room/${id}`, () => onMessageRecieve);
    userEnter();
    scrollToBot();
    getDetailChat(id).then((res) => setChatList(res.data));
    console.log("연결성공~");
  };

  const onMessageRecieve = (e: IMessage) => {
    let data = JSON.parse(e.body);
    if (data.type === "TALK") {
      getDetailChat(id).then((res: AxiosResponse) => {
        setChatList(res.data);
      });
    }
    scrollToBot();
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
  // useEffect(() => {
  //   setMyChat(message);
  // }, [message]);
  const sendMessage = () => {
    if (message) {
      let payload = {
        type: "TALK",
        roomId: id,
        sender: myNickName,
        message: message,
      };
      client.send(
        `/pub/api/chat/message`,
        { myNickName },
        JSON.stringify(payload)
      );
      setMessage("");
    }
    scrollToBot();
  };

  const enterMessage = (e: React.FormEvent) => {
    e.preventDefault();
    scrollToBot();
    sendMessage();
    setMyChat([...myChat, { message: message }]);
  };
  console.log(message);
  return (
    <LayOut>
      <STContainer>
        <ChatHeader title={other} arrow={true} menu={id} />
        <STChatList ref={scrollRef}>
          <div className="time">
            <p>오후10:00</p>
          </div>
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
          {myChat.map((m: IMychat) => {
            return <Chat nickname={myNickName} message={m.message} />;
          })}
        </STChatList>
        <div className="footWrap">
          <STInputFooter onSubmit={(e) => enterMessage(e)}>
            <input
              className="chat_input"
              type="text"
              placeholder="메세지 입력"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={enterMessage} />
          </STInputFooter>
        </div>
      </STContainer>
    </LayOut>
  );
}

const STContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  //overflow-y: scroll;
  .footWrap {
    // border: 1px solid black;
    width: 358px;
    height: 50px;
    position: fixed;
    bottom: 0px;
    background-color: white;
  }
`;
const STChatList = styled.div`
  //border: 1px solid black;
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  margin-bottom: 50px;
  //height: 100%;
  //soverflow: auto;
  .time {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 13px;
    font-weight: 400;
    color: #aeaeae;
  }
`;
const STInputFooter = styled.form`
  //border: 1px solid black;
  width: 350px;
  height: 44px;
  position: fixed;
  bottom: 5px;
  border-radius: 8px;
  //border: 1px solid #efefef;
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  button {
    width: 24px;
    height: 24px;
    border-radius: 100%;
    border: none;
    background-image: url("/image/icon-arrow-right-circle-mono.svg");
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
