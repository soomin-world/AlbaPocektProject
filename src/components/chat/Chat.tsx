//import * as StompJs from "@stomp/stompjs";
import { Client, Message, Stomp } from "@stomp/stompjs";
import { Children, useEffect } from "react";
import SockJS from "sockjs-client";
import styled from "styled-components";

type StyleProps = {
  children?: React.ReactNode;
  isMe?: true;
};
function Chat() {
  // ------
  // var socket = new SockJS(url);

  // var stompClient = Stomp.over(()=> socket)

  // stompClient.connect(header, connectCallback, errorCallback, closeEventCallback)
  // const client = new StompJs.Client({
  //   brokerURL: url,
  //   connectHeaders: {
  //     login: "user",
  //     passcode: "password",
  //   },
  //   debug: function (str) {
  //     console.log(str);
  //   },
  //   reconnectDelay: 5000, //자동 재 연결
  //   heartbeatIncoming: 4000,
  //   heartbeatOutgoing: 4000,
  // });

  // client.onConnect = function (frame) {
  //   Do something, all subscribes must be done is this callback
  //   This is needed because this will be executed after a (re)connect
  // };

  // client.onStompError = function (frame) {
  //   Will be invoked in case of error encountered at Broker
  //   Bad login/passcode typically will cause an error
  //   Complaint brokers will set `message` header with a brief message. Body may contain details.
  //   Compliant brokers will terminate the connection after any error
  //   console.log("Broker reported error: " + frame.headers["message"]);
  //   console.log("Additional details: " + frame.body);
  // };

  // client.activate();
  const myId = localStorage.getItem("userId");
  const userId = "내아이디";
  return (
    <>
      {/* {myId === userId ? (
        <STOther>
          <STProfile>
            <img src="/image/댓글 예시.jpeg" alt="프로필사진" />
          </STProfile>
          <STBody>
            <ChatPiece>채팅내용sdfsdfsasdfasdfasdfasdasdfassㅇ뭐지</ChatPiece>
          </STBody>
        </STOther>
      ) : (
        <STMe>
          <STBody>
            <ChatPiece>내가보낸 내용 </ChatPiece>
          </STBody>
        </STMe>
      )} */}
      <STOther>
        <STProfile>
          <img src="/image/댓글 예시.jpeg" alt="프로필사진" />
        </STProfile>
        <STBody>
          <ChatPiece>채팅내용sdfsdfsasdfasdfasdfasdasdfassㅇ뭐지</ChatPiece>
        </STBody>
      </STOther>
      {/** 나면 밑에거, 상대면 위에거 props로 나인지 아닌지 boolean 보내기  */}
      <STMe>
        <STBody>
          <ChatPiece>내가보낸 내용 </ChatPiece>
        </STBody>
      </STMe>
    </>
  );
}

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
export default Chat;
