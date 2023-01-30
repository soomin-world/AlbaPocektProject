import styled from "styled-components";

type Props = {
  children: React.ReactNode;
  padding?: string;
  position?: string;
  height?: string;
  font?: string;
};

const LayOut: React.FC<Props> = ({
  children,
  padding,
  position,
  height,
  font,
}) => {
  return (
    <STContainer>
      <STLayOut
        padding={padding}
        position={position}
        height={height}
        font={font}
      >
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
  height: string | undefined;
  font: string | undefined;
}>`
  ::-webkit-scrollbar {
    display: none;
  }
  font-family: ${(props) => (props.font ? props.font : "Noto Sans KR")};
  background-color: white;
  display: flex;
  flex-direction: column;
  // min-height: 734px;
  height: ${(props) => (props.height ? props.height : null)};
  // padding-bottom: 100px;
  width: 375px;
  //border: 1px solid black;
  overflow: auto;
  padding: ${(props) => (props.padding ? props.padding : "0px 17px 0px 17px")};
  position: ${(props) => (props.position ? props.position : "static")};
`;

export default LayOut;
