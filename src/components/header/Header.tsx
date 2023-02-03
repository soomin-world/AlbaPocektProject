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
      {option ? (
        <div onClick={option}>
          <h3>로그아웃</h3>
        </div>
      ) : null}
    </STHeader>
  );
};

const STHeader = styled.div<{ padding: string | undefined }>`
  display: flex;
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
    flex-direction: column-reverse;
    height: 25px;
    margin-left: 75px;
    h3 {
      font-size: 13px;
      font-weight: 400;
      color: #ff3b30;
    }
  }
`;

export default Header;
