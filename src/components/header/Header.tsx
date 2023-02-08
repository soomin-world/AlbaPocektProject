import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { searchKeywordAtom } from "../../atoms";
import { HeaderProps } from "../../types/header";

const Header: React.FC<HeaderProps> = ({
  title,
  padding,
  option,
  button,
  marginLeft,
  location,
}) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useRecoilState(searchKeywordAtom);

  console.log(location);
  console.log(typeof location);

  const onArrowHandler = () => {
    setKeyword("");
    if (location !== undefined) {
      // console.log("원하는 대로 이동");
      navigate("/board");
    } else {
      // console.log("뒤로 이동");
      window.history.back();
    }
  };

  return (
    <STHeader padding={padding} marginLeft={marginLeft}>
      <img src="/image/iconLeftArrow.svg" alt="<" onClick={onArrowHandler} />
      <h1>{title}</h1>
      {option ? <div onClick={option}>{button}</div> : null}
    </STHeader>
  );
};

const STHeader = styled.div<{
  padding: string | undefined;
  marginLeft: string | undefined;
}>`
  display: flex;
  /* justify-content: space-between;
  justify-content: flex-start; */
  align-items: center;
  //height: 100%;
  min-height: 50px;
  // padding: 0 3% 0 3%;
  padding: ${(props) => (props.padding ? props.padding : "null")};
  //border: 1px solid black;
  img {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  h1 {
    //border: 1px solid black;
    width: 83px;
    height: 25px;
    font-size: 17px;
    font-weight: 500;
    margin-left: ${(props) => props.marginLeft};
  }
  div {
    min-width: 50px;
    //border: 1px solid black;
    display: flex;
    height: 15px;
    // flex-direction: column-reverse;
    margin-left: 80px;
    margin-bottom: 6px;
    font-size: 13px;
    font-weight: 400;
    color: #ff3b30;
    cursor: pointer;
  }
`;

export default Header;
