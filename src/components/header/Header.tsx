import styled from "styled-components";
import { HeaderProps } from "../../types/header";

const Header: React.FC<HeaderProps> = ({ title, padding }) => {
  return (
    <STHeader padding={padding}>
      <img
        src="/image/iconLeftArrow.svg"
        alt="<"
        onClick={() => window.history.back()}
      />
      <h1>{title}</h1>
    </STHeader>
  );
};

const STHeader = styled.div<{ padding: string | undefined }>`
  display: flex;
  min-height: 50px;
  padding: ${(props) => (props.padding ? props.padding : "null")};
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
