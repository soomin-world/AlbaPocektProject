import styled from "styled-components";
import LayOut from "../layout/LayOut";

function Loading() {
  return (
    <LayOut height="100vh">
      <Wrap>
        <img src="/image/iconLogo.svg" />
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
    width: 200px;
  }
`;

export default Loading;
