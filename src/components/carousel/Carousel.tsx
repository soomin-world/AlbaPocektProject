import styled from "styled-components";
import LayOut from "../layout/LayOut";

const Carousel = () => {
  return (
    <LayOut height="100vh" padding="0px">
      <STContainer>
        <STWindow>
          <div className="carousel">
            <div className="1">
              <img src="/image/text.svg" alt="carousel" />
              <img src="carousel1.svg" alt="carousel" />
            </div>
            <div className="2">
              <img src="/image/text2.svg" alt="carousel" />
              <img src="carousel2.svg" alt="carousel" />
            </div>
            <div className="3">
              <img src="/image/text3.svg" alt="carousel" />
              <img src="carousel3.svg" alt="carousel" />
            </div>
            <div className="4">
              <img src="/image/text4.svg" alt="carousel" />
              <img src="carousel4.svg" alt="carousel" />
            </div>
          </div>
        </STWindow>
      </STContainer>
    </LayOut>
  );
};

const STContainer = styled.div`
  //border: 1px solid black;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const STWindow = styled.div`
  background-color: grey;
  width: 410.83px;
  height: 334.08px;
  border: 1px solid black;
  overflow: hidden;
  .carousel {
    display: flex;
    .div {
      display: flex;
      flex-direction: column;
    }
  }
`;
export default Carousel;
