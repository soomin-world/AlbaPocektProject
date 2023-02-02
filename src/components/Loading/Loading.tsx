import styled from "styled-components";
import LayOut from "../layout/LayOut";

function Loading() {
  return (
    <LayOut height="100vh">
      <Wrap>
        <img src="/image/iconLogoLarge.svg" />
      </Wrap>
    </LayOut>
  );
}

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;

  img {
    width: 100px;
  }
`;

export default Loading;
