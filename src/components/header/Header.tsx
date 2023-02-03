import styled from "styled-components";
import { HeaderProps } from "../../types/header";

const Header: React.FC<HeaderProps> = ({ title, padding, option }) => {
  return (
    <STHeader padding={padding}>
      <img
        src="/image/iconLeftArrow.svg"
        alt="<"
        onClick={() => window.history.back()}
      />
      <h1>{title}</h1>
      {option ? <div onClick={option}>로그아웃</div> : null}
    </STHeader>
  );
};

const STHeader = styled.div<{ padding: string | undefined }>`
  display: flex;
  align-items: center;
  //height: 100%;
  min-height: 50px;
  padding: ${(props) => (props.padding ? props.padding : "null")};
  //border: 1px solid black;
  img {
    width: 24px;
    height: 24px;
  }
  h1 {
    //border: 1px solid black;
    width: 83px;
    height: 25px;
    font-size: 17px;
    font-weight: 500;
    margin-left: 115px;
  }
  div {
    //border: 1px solid black;
    display: flex;
    height: 15px;
    // flex-direction: column-reverse;
    margin-left: 75px;
    font-size: 13px;
    font-weight: 400;
    color: #ff3b30;
    margin-bottom: 5px;
  }
`;

export default Header;
