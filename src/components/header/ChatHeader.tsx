import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { quitChatRoom } from "../../APIs/chatApi";
import { HeaderProps } from "../../types/header";

const ChatHeader: React.FC<HeaderProps> = ({
  title,
  arrow,
  menu,
  location,
  client,
  margin,
}) => {
  const navigate = useNavigate();
  const quitRoom = (id: string) => {
    quitChatRoom(id);
  };
  const onArrowClick = () => {
    if (client) {
      client?.disconnect(() => {});
      alert("연결끊기");
    }
    navigate(`${location}`);
  };
  return (
    <STHeader>
      <div className="wrap">
        {arrow && (
          <img src="/image/leftArrow.png" alt="<" onClick={onArrowClick} />
        )}
        <h1 style={{ marginLeft: `${margin}` }}>{title}</h1>
      </div>
      {menu && (
        <div className="icons">
          <img
            src="/image/icon-out-mono.svg"
            alt="menu"
            onClick={() => quitChatRoom(menu)}
          />
        </div>
      )}
    </STHeader>
  );
  // 필요한 요소들 , 채팅방 추가 채팅방 나가기 현재 존재하는 채팅방이 업을경우 뭔가 이미지
  // 검색 -> 되면넣기, 채팅방 추가필수, 톱니바퀴(설정) => 편집-> 편집 눌렀을때 마이페이지처럼 체크박스나와서 나가기 가능 체크된 사항이 없을 경우 버튼 disable
};
const STHeader = styled.div`
  position: fixed;
  width: 345px;
  top: 0;
  display: flex;
  justify-content: space-between;
  margin: px 0px 10px 0px;
  align-items: center;
  height: 50px;
  background-color: white;
  .wrap {
    display: flex;
    img {
      width: 24px;
      height: 24px;
    }
    h1 {
      //width: 83px;
      height: 25px;
      font-size: 20px;
      font-weight: 500;
      margin-left: 10px;
    }
  }
  .icons {
  }
`;
export default ChatHeader;
