import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const ChatRoomCard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <>
      <STContainer onClick={() => navigate(`/chat/${1}`)}>
        <div className="profileImg">
          <img src="/image/x.png" />
        </div>
        <div className="body">
          <h1>상대방 닉네임</h1>
          <div className="content">
            여기에 마지막 메세지의 일부가 들어갑니다
          </div>
        </div>
        <div className="lastMsgTime">오후 9:47</div>
      </STContainer>
    </>
  );
};

const STContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  padding: 3px;
  align-items: center;
  justify-content: space-between;
  .profileImg {
    width: 20%;
    height: 70%;
    img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
    }
  }
  .body {
    width: 60%;
    height: 70%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    h1 {
      font-weight: 500;
    }
    div {
      font-size: 12px;
    }
  }
  .lastMsgTime {
    width: 10%;
    font-size: 10px;
  }
`;
export default ChatRoomCard;
