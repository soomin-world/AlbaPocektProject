import styled from "styled-components";
// import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";

const MyAlert = () => {
  const token = localStorage.getItem("is_login");
  const eventSource = new EventSource("https://woooo.shop/subscribe", {
    headers: {
      Authorization: token,
    },
  });

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(data.message);
  };

  return (
    <Total>
      <Alert>알림</Alert>
    </Total>
  );
};
const Total = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const Alert = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #5fce80;
  position: fixed;
  bottom: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default MyAlert;
