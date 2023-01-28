//import * as StompJs from "@stomp/stompjs";
import StompJs, { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

function Chat() {
  var stompClient;

  const registerUser = () => {
    var sockJS = new SockJS(process.env.REACT_APP_API_URL + "/wss/chat");
    // var sockJS = new SockJS('http://13.125.236.69/wss/chat');
    stompClient = Stomp.over(sockJS);
    stompClient.debug = () => console.log();
    stompClient.connect(onConnected, onError);
  };

  const onConnected = () => {};

  const onError = () => {};
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
  return <div> 채팅 </div>;
}

export default Chat;
