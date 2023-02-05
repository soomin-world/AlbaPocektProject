import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getChatList } from "../../APIs/chatApi";
import { otherNickName } from "../../atoms";

type ChatCardType = {
  roomId: string;
  nickname: string;
  profileImage: string;
  lastMessage: string;
  createdAt: string;
};

const ChatRoomCard = () => {
  const [otherNickname, setOtherNickName] = useRecoilState(otherNickName);
  const navigate = useNavigate();
  const { data } = useQuery(["chat"], () => getChatList());
  console.log(data);
  const detailDate = (a: Date) => {
    const milliSeconds = new Date().getTime() - a.getTime();
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  };

  const onClickHandler = (e: ChatCardType) => {
    setOtherNickName(e?.nickname);
    navigate(`/chat/${e?.roomId}`);
  };
  return (
    <>
      {data?.data.length !== 0 ? (
        data?.data.map((c: ChatCardType) => {
          return (
            <STContainer key={c.roomId} onClick={() => onClickHandler(c)}>
              <div className="profileImg">
                <img src={c.profileImage} />
              </div>
              <div className="body">
                <h1>{c.nickname}</h1>
                <div className="content">
                  {c.lastMessage ? c.lastMessage : "첫 메세지롤 보내보세요!"}
                </div>
              </div>
              <div className="lastMsgTime">
                <h3>
                  {c.createdAt ? detailDate(new Date(c.createdAt)) : null}
                </h3>
              </div>
            </STContainer>
          );
        })
      ) : (
        <EmptyChatList>
          <img src="/image/speech-bubble 1.svg" alt="텅" />
          <p>생성된 채팅방이 없습니다.</p>
        </EmptyChatList>
      )}
    </>
  );

  // <STContainer onClick={() => navigate(`/chat/${1}`)}>
  //   <div className="profileImg">
  //     <img src="/image/x.png" />
  //   </div>
  //   <div className="body">
  //     <h1>상대방 닉네임</h1>
  //     <div className="content">여기에 마지막 메세지의 일부가 들어갑니다</div>
  //   </div>
  //   <div className="lastMsgTime">오후 9:47</div>
  // </STContainer>
};

const STContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  padding: 4px;
  align-items: center;
  justify-content: space-between;
  //border: 1px solid black;
  .profileImg {
    width: 20%;
    height: 80%;
    //border: 1px solid black;
    display: flex;
    align-items: center;
    img {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 100%;
      //border: 1px solid black;
    }
  }
  .body {
    width: 60%;
    height: 60%;
    display: flex;
    flex-direction: column;
    //gap: 10px;
    //border: 1px solid black;
    h1 {
      font-weight: 500;
      font-size: 15px;
    }
    div {
      font-size: 12px;
      margin-top: 20px;
    }
  }
  .lastMsgTime {
    width: 15%;
    height: 60%;
    font-size: 10px;
    padding: 2px;
    //border: 1px solid black;
    display: flex;
    flex-direction: row-reverse;
  }
`;

const EmptyChatList = styled.div`
  display: flex;
  flex-direction: column;
  //border: 1px solid black;
  width: 100%;
  height: 80vh;
  justify-content: center;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  h3 {
    color: #aeaeae;
    font-size: 15px;
    font-weight: 400;
  }
`;
export default ChatRoomCard;
