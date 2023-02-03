import { useQuery } from "@tanstack/react-query";
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

  const time = detailDate(new Date());
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
                {c.createdAt ? detailDate(new Date(c.createdAt)) : null}
                {}
              </div>
            </STContainer>
          );
        })
      ) : (
        <div>텅~ </div>
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
  padding: 3px;
  align-items: center;
  justify-content: space-between;
  .profileImg {
    width: 20%;
    height: 70%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
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
