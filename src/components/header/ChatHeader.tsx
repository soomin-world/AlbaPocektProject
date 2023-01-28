import styled from "styled-components";
import { HeaderProps } from "../../types/header";

const ChatHeader: React.FC<HeaderProps> = ({ title, arrow }) => {
  return (
    <STHeader>
      <div className="wrap">
        {arrow && (
          <img
            src="/image/leftArrow.png"
            alt="<"
            onClick={() => window.history.back()}
          />
        )}
        <h1>{title}</h1>
      </div>
      <div className="icons">
        <img src="/image/iconChat.png" />
        <img src="/image/iconChat.png" />
      </div>
    </STHeader>
  );
  // 필요한 요소들 , 채팅방 추가 채팅방 나가기 현재 존재하는 채팅방이 업을경우 뭔가 이미지
  // 검색 -> 되면넣기, 채팅방 추가필수, 톱니바퀴(설정) => 편집-> 편집 눌렀을때 마이페이지처럼 체크박스나와서 나가기 가능 체크된 사항이 없을 경우 버튼 disable
};
const STHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 12px 0px 41.5px 0px;
  height: 35px;
  .wrap {
    display: flex;
    img {
      width: 24px;
      height: 24px;
    }
    h1 {
      //width: 83px;
      height: 25px;
      font-size: 17px;
      font-weight: 500;
      margin-left: 10px;
    }
  }
  .icons {
  }
`;
export default ChatHeader;
