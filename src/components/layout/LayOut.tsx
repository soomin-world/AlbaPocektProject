import styled from "styled-components";

type Props = {
  children: React.ReactNode;
  padding?: string;
  position?: string;
};

const LayOut: React.FC<Props> = ({ children, padding, position }) => {
  return (
    <STContainer>
      <STLayOut padding={padding} position={position}>
        {children}
      </STLayOut>
    </STContainer>
  );
};

const STContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const STLayOut = styled.div<{
  padding: string | undefined;
  position: string | undefined;
}>`
  ::-webkit-scrollbar {
    display: none;
  }
  font-family: "Noto Sans KR";
  display: flex;
  flex-direction: column;
  // min-height: 734px;
  //height: 100vh;
  // padding-bottom: 100px;
  width: 375px;
  //border: 1px solid black;
  overflow: auto;
  padding: ${(props) => (props.padding ? props.padding : "0px 17px 0px 17px")};
  position: ${(props) => (props.position ? props.position : "static")};
`;

export default LayOut;
