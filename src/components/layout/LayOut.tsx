import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

const LayOut: React.FC<Props> = ({ children }) => {
  return (
    <STContainer>
      <STLayOut>{children}</STLayOut>
    </STContainer>
  );
};

const STContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const STLayOut = styled.div`
  font-family: "Noto Sans KR";
  display: flex;
  flex-direction: column;
  min-height: 1200px;
  //padding-bottom: 100px;
  width: 375px;
  border: 1px solid black;
  overflow: auto;
`;

export default LayOut;
