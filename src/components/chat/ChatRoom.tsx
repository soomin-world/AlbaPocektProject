import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import SockJS from "sockjs-client";
import styled from "styled-components";
import { baseURL } from "../../APIs/axios";
import { getChatList, getDetailChat } from "../../APIs/chatApi";
import { otherNickName } from "../../atoms";
import ChatHeader from "../header/ChatHeader";
import LayOut from "../layout/LayOut";
import Chat, { ChatType } from "./Chat";
import stompJS, { Message } from "stompjs";
import { useQuery } from "@tanstack/react-query";
import { IPayload } from "../../types/chatType";

function ChatRoom() {
  const { id } = useParams();
  const otherName = useRecoilValue(otherNickName);
  const myNickName = localStorage.getItem("nickname");
  const url = baseURL;
  //----------------------------------------------

  // 입력받은 message값
  const [message, setMessage] = useState("");
  // chat내용 리스트
  const [chatList, setChatList] = useState<IPayload[]>([]);
  // 서버에서 get해온 이전 채팅 조회부분
  const [isData, setIsData] = useState(false);
  const { data, isSuccess, isLoading } = useQuery(
    ["chat", id],
    () => getDetailChat(id),
    {
      onSuccess: (data) => {
        //console.log(data);
        setChatList(data.data);
      },
    }
  );
  // 스크롤 최하단으로 내리기
  const scrollToBot = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  //------------------------------------------------

  // stompclient생성부분
  const sock = new SockJS(url + "/ws/chat");
  const client = stompJS.over(sock);

  const connectStomp = () => {
    client.connect({ myNickName }, onConnect, onError);
  };

  useEffect(() => {
    if (isSuccess) {
      setChatList(data?.data);
    }
    if (data?.data.length === 0) {
      setIsData(false);
      console.log("방폭파");
    } else {
      setIsData(true);
    }
    console.log("eeee");
  }, [isSuccess, data?.data]);

  useEffect(() => {
    connectStomp();
    scrollToBot();
  }, []);
  //trouble shooting... useeffect를 잘 나누어 쓰자..
  const onConnect = () => {
    userEnter();
    scrollToBot();
    //setChatList(data?.data);
    onSub();
    // 연결되면 이전데이터로 chatlist 설정
    console.log("연결성공~");
  };

  const onError = () => {
    console.log("에러에요 ");
  };

  const onSub = () => {
    client.subscribe(`/sub/chat/room/${id}`, (e) => onMessageRecieve(e));
  };

  const onLeave = () => {
    const payload = {
      type: "QUIT",
      roomId: id,
      sender: myNickName,
      message: "퇴장",
    };
    client.send(
      `/pub/api/chat/message`,
      { myNickName },
      JSON.stringify(payload)
    );
  };
  //-------------------------------------------------

  const onMessageRecieve = (e: Message) => {
    // 메세지가 오면 받아온 데이터의 body를 json.parse해서 data 라는 변수에 넣음
    let data = JSON.parse(e.body);
    if (data.type === "TALK") {
      getDetailChat(id).then((res) => {
        return setChatList([...res.data]);
      });
    }
    scrollToBot();
  };

  useEffect(() => {
    scrollToBot();
  }, [chatList]);

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
    scrollToBot();
    console.log("유저입장");
  };

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
      scrollToBot();
      setIsData(true);
    }
  };

  const enterMessage = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  if (isLoading) {
    return <div>로딩중</div>;
  }

  return (
    <LayOut>
      <STContainer>
        <ChatHeader
          title={otherName}
          arrow={true}
          menu={id}
          location="/chat"
          client={client}
          isData={isData}
        />
        <STChatList>
          <div className="time">{/* <p>오후10:00</p> */}</div>
          {chatList?.map((c: ChatType, i) => {
            return (
              <Chat
                createdAt={c.createdAt}
                key={i}
                message={c.message}
                sender={c.sender}
                profileImage={c.profileImage}
                readUser={c.readUser}
              />
            );
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
  //overflow: auto;
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
  width: 343px;
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
    border-radius: 8px;
    background-color: #f9f9f9;
    outline: none;
  }
`;

export default ChatRoom;
