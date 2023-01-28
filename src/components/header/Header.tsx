import styled from "styled-components";
import { HeaderProps } from "../../types/header";

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <STHeader>
      <img
        src="/image/leftArrow.png"
        alt="<"
        onClick={() => window.history.back()}
      />
      <h1>{title}</h1>
    </STHeader>
  );
};

const STHeader = styled.div`
  display: flex;
  margin: 12px 0px 20px 0px;
  height: 35px;
  img {
    width: 24px;
    height: 24px;
  }
  h1 {
    width: 83px;
    height: 25px;
    font-size: 17px;
    font-weight: 500;
    margin-left: 102px;
  }
`;

export default Header;
